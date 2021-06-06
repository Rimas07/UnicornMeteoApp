"use strict"
const {UuObjectDao} = require("uu_appg01_server").ObjectStore;
class GatewayMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, code: 1 }, { unique: true });
    await super.createIndex({ awid: 1, state: 1 });
    await super.createIndex({ awid: 1, uuEe: 1 });
  }

  async create(uuObject) {
    return await super.insertOne(this._prepareObject(uuObject));
  }
  _prepareObject(uuObject) {
    return uuObject;
  }
      async listByVisibility(awid, visibility, pageInfo = {}) {
        return await super.find({awid, visibility}, pageInfo);
      }
    }
    
  
    module.exports = GatewayMongo;