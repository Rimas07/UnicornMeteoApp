'use strict';

const GatewayMainUseCaseError = require('./gateway-main-use-case-error.js');
const MEASURMENT_ERROR_PREFIX = `${GatewayMainUseCaseError.ERROR_PREFIX}measurment/`;

const Create = {
  UC_CODE: `${MEASURMENT_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Insert.UC_CODE}invalidDtoIn`;
      this.message = 'DtoIn is not valid.';
    }
  },
  MeasurmentDaoInsertFailed: class extends GatewayMainUseCaseError{
    constructor() {
      super(...arguments);
      this.code = `${Insert.UC_CODE}mongoFail`;
      this.message = "Couldn't save data to mongoDB.";
    }
  },
};


module.exports = {


    Create,
}