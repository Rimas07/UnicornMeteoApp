
'use strict';
const MeasurmentAbl = require('../../abl/measurment-abl.js');

class MeasurmentController {
  create(ucEnv) {
    return MeasurmentAbl.create(ucEnv.getDtoIn(), ucEnv.getSession());
  }

}
  module.exports = new MeasurmentController();

