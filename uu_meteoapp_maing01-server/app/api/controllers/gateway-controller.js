
const GatewayAbl = require("../../abl/gateway-abl.js")

class GatewayController {

    create(ucEnv) {
      
      return GatewayAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), );
    }    

    update(ucEnv) {
      return GatewayAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
    }
  






    list(ucEnv) {
      return GatewayAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());    
    }
    get(ucEnv) {
      return GatewayAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
    }


    delete(ucEnv) {
      return GatewayAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
    }
  
    }



    module.exports = new  GatewayController();
