"use strict";

const GatewayMainUseCaseError = require("./gateway-main-use-case-error.js");
const MEASUREMENT_ERROR_PREFIX = `${GatewayMainUseCaseError.ERROR_PREFIX}measurement/`;

const Enter = {
  UC_CODE: `${MEASUREMENT_ERROR_PREFIX}Enter/`,
  InvalidDtoIn: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Enter.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  MeasurementDaoEnterFailed: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Insert.UC_CODE}mongoFail`;
      this.message = "Couldn't save data to mongoDB.";
    }
  },
  NoAssociatedGateway: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Insert.UC_CODE}noAssociatedGateway`;
      this.message = "There is no device associated with your uuIdentity!";
    }
  },
};

const Get = {
  UC_CODE: `${MEASUREMENT_ERROR_PREFIX}Get/`,
  GatewayDoesntExist: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}noGateway`;
      this.message = "There is no gateway with such id.";
    }
  },
  MeasurementLoadFailed: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}loadFailed`;
      this.message = "There was a problem loading metrics.";
    }
  },
};

module.exports = {
  Enter,
  Get,
};
