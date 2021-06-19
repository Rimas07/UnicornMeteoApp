'use strict';
const { UuObjectDao } = require('uu_appg01_server').ObjectStore;
const dayjs = require('dayjs');

class MeasurementMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });
    await super.createIndex({ deviceId: 1 });
  }

  enter(uuObject) {
    
    super.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });
    super.createIndex({ GatewayId: 1 });
    
    return Array.isArray(uuObject) ? super.enterMany(uuObject) : super.enterOne(uuObject);
  }

  /**
   *
   * @param {object} metrics an array of metrics to thin
   * @param {number} interval interval in seconds
   * @returns {object} a thinned array by given interval
   */
  #thinByInterval(measurement, interval) {
    let currentCompare;
    let dtoOut = {};
    measurement.forEach((measurement) => {
      let intervaledDate = new Date(currentCompare || '1990');
      intervaledDate.setSeconds(intervaledDate.getSeconds() + interval);
      if (measurement.timestamp.getTime() >= intervaledDate.getTime()) {
        currentCompare = measurement.timestamp;
        dtoOut[currentCompare] = [measurement];
      } else dtoOut[currentCompare].push(measurement);
    });
    return Object.values(dtoOut).map((val) => val[val.length - 1]);
  }

  /**
   * ♿♿♿
   * get => thins result after mongo aggregation
   * getOld => thins by interval directly in mongo aggregation
   */

  async get({ gatewayId, period, units, interval }) {
    period = dayjs().subtract(period, units);
    let match = await super.aggregate([
      { $match: { gatewayId, timestamp: { $gte: new Date(period) } } },
      { $project: { _id: 0, sys: 0 } },
    ]);
    if (match.length) {
      match = this.#thinByInterval(match, interval);
    }
    return match;
  }

  async getOld({ gatewayId, period, units, interval }) {
    /* 
    Have to double aggregate as 'buckets' in bucketAuto expects a constant, so any referenced value from prev stage can't be used.
    No idea how to implement this interval feature better within a mongo aggregation.
    */
    period = dayjs().subtract(period, units);
    const [count] = await super.aggregate([
      { $match: { gatewayId, timestamp: { $gte: new Date(period) } } },
      { $count: 'count' },
      { $set: { buckets: { $multiply: ['$count', { $divide: [30, interval || 30] }] } } },
    ]);
    return count
      ? await super.aggregate([
          { $match: { _id: gatewayId, timestamp: { $gte: new Date(period) } } },
          {
            $bucketAuto: {
              groupBy: { $toLong: '$timestamp' },
              buckets: Math.ceil(count.buckets),
              output: {
                timestamp: { $last: '$timestamp' },
                measurement: { $last: '$measurement' },
              },
            },
          },
          { $project: { _id: 0 } },
        ])
      : [];
  }

  purge() {
    return super.deleteMany({});
  }
}

module.exports = MeasurementMongo;