"use strict";
const MeteoappMainAbl = require("../../abl/meteoapp-main-abl.js");

class MeteoappMainController {
  init(ucEnv) {
    return MeteoappMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }


  
}
module.exports = new MeteoappMainController();
