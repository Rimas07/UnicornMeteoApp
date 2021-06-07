'use strict';
const MeasurmentAbl = require('../../abl/measurment-abl.js');

class MeasurmentController {
  insert(ucEnv) {
    return MeasurmentAbl.insert(ucEnv.getDtoIn(), ucEnv.getSession().getIdentity().getUuIdentity());
  }

}
  module.exports = new MeasurmentController();