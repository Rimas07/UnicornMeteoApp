
const GatewayAbl = require("../../abl/gateway-abl.js")

class GatewayController {

    create(ucEnv) {
      
      return GatewayAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), );
    }    


    list(ucEnv) {
      return GatewayAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());    
    }
    }



    module.exports = new  GatewayController();
