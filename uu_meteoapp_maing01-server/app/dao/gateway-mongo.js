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
  async list(awid, pageInfo = {}) {
    const filter = { awid };
    return await super.find(filter, pageInfo);
  }
 
  _prepareObject(uuObject) {
    return uuObject;
  }
  async getByCode(awid, code) {
    const filter = { awid, code };
    return await super.findOne(filter);
  }




  delete({id: GatewayIds}) {
    return super.deleteMany({
      _id: { $in: GatewayIds }
    })
  }
}
  
    module.exports = GatewayMongo;