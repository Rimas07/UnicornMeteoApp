'use strict';
const MeasurementAbl = require('../../abl/measurement-abl.js');

class MeasurementController {
  enter(ucEnv) {
    return MeasurementAbl.enter(ucEnv.getUri().getAwid(),ucEnv.getDtoIn());
  }
  get(ucEnv) {
   
    return MeasurementAbl.get(ucEnv.getDtoIn());
    
  }
  getOld(ucEnv) {
    return MeasurementAbl.get(ucEnv.getDtoIn(), true);
  }
  purge() {
    return MeasurementAbl.purge();
  }
}

module.exports = new MeasurementController();