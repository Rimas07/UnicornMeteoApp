'use strict';
const { UuObjectDao } = require('uu_appg01_server').ObjectStore;
const dayjs = require('dayjs');

class MeasurmentMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });
    await super.createIndex({ deviceId: 1 });
  }

  create(uuObject) {
    
    return Array.isArray(uuObject) ? super.createMany(uuObject) : super.createOne(uuObject);
  }
}
  module.exports = MeasurmentMongo;