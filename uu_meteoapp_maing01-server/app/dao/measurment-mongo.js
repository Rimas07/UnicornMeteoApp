'use strict';
const { UuObjectDao } = require('uu_appg01_server').ObjectStore;
const dayjs = require('dayjs');

class MetricsMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });
    await super.createIndex({ deviceId: 1 });
  }

  insert(uuObject) {
    /* 
    Uncomment once to create indexes. They are not being created with collection with createSchema() for some reason.
    super.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });
    super.createIndex({ deviceId: 1 });
    */
    return Array.isArray(uuObject) ? super.insertMany(uuObject) : super.insertOne(uuObject);
  }
}
  module.exports 