"use strict"
const {UuObjectDao} = require("uu_appg01_server").ObjectStore;

class GatewayMongo extends UuObjectDao {
    async createSchema() {
      await super.createIndex({awid: 1, _id: 1}, {unique: true});
      await super.createIndex({awid: 1, visibility: 1});
    }

    async create(gateway){
        return await super.insertOne(gateway);
      }
      
      async listByVisibility(awid, visibility, pageInfo = {}) {
        return await super.find({awid, visibility}, pageInfo);
      }
    }
    
    module.exports = GatewayMongo;