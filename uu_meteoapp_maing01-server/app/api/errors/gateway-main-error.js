const GatewayMainUseCaseError = require("./gateway-main-use-case-error");

const GATEWAY_ERROR_PREFIX = `${GatewayMainUseCaseError.ERROR_PREFIX}gateway/`;


const Create = {
  UC_CODE: `${GATEWAY_ERROR_PREFIX}create/`,

  

  InvalidDtoIn: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  CodeIsNotUnique: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}codeIsNotUnique`;
      this.message = "Gateway with this code already exists.";
    }
  },

  GatewayDaoCreateFailed: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Create.UC_CODE}gatewayDaoCreateFailed`;
      this.message = "Failed to create gateway uuObject in object store.";
    }
  },
};



const Delete = {
  UC_CODE: `${GATEWAY_ERROR_PREFIX}Delete/`,
  GatewayDaoDeleteFailed: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}mongoError`;
      this.message = 'There was an error while removing device, please try again later.';
    }
  },
};







const List = {
  UC_CODE: `${GatewayMainUseCaseError.ERROR_PREFIX}gateway/list/`,

  InvalidDtoIn: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  GatewayDaoCreateFailed: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}GatewayDaoCreateFailed`;
      this.message = "Create gateway by gateway Dao create failed.";
    }
  },
};



module.exports = {
  Create,
  List,
  Delete
};
