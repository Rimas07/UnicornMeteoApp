const GatewayMainUseCaseError = require("./gateway-main-use-case-error");

const GATEWAY_ERROR_PREFIX = `${GatewayMainUseCaseError.ERROR_PREFIX}gateway/`;


const Create = {
  UC_CODE: `${GATEWAY_ERROR_PREFIX}create/`,

  UuAppInstanceDoesNotExist: class extends GatewayMainUseCaseError{
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}uuAppInstanceDoesNotExist`;
      this.message = "UuAppInstance does not exist.";
    }
  },

  UuAppInstanceIsNotInCorrectState: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}uuAppInstanceIsNotInCorrectState`;
      this.message = "UuAppInstance is not in correct state.";
    }
  },

  InvalidDtoIn: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  InvalidTimezone: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidTimezone`;
      this.message = "The chosen timezone is invalid or unknown.";
    }
  },

  CodeIsNotUnique: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}codeIsNotUnique`;
      this.message = "Gateway with this code already exists.";
    }
  },

  UuEeIsNotUnique: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}uuEeIsNotUnique`;
      this.message = "Gateway with this uuEe already exists.";
    }
  },

  PermissionCreateFailed: class extends GatewayMainUseCaseError{
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Create.UC_CODE}uuEeIsNotUnique`;
      this.message = "Failed to set add uuEe to gateways group.";
    }
  },

  GatewayDaoCreateFailed: class extends GatewayMainUseCaseError{
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Create.UC_CODE}gatewayDaoCreateFailed`;
      this.message = "Failed to create gateway uuObject in object store.";
    }
  },
};

const Update = {
  UC_CODE: `${GATEWAY_ERROR_PREFIX}update/`,
  
  UuAppInstanceDoesNotExist: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuAppInstanceDoesNotExist`;
      this.message = "UuAppInstance does not exist.";
    }
  },

  UuAppInstanceIsNotInCorrectState: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuAppInstanceIsNotInCorrectState`;
      this.message = "UuAppInstance is not in correct state.";
    }
  },

  InvalidDtoIn: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  InvalidTimezone: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidTimezone`;
      this.message = "The chosen timezone is invalid or unknown.";
    }
  },

  GatewayDoesNotExist: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}gatewayDoesNotExist`;
      this.message = "This gateway does not exist.";
    }
  },

  GatewayIsNotInCorrectState: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}gatewayIsNotInCorrectState`;
      this.message = "Gateway is in final state and thus cannot be updated. If you want to update it's values, set it to active.";
    }
  },

  CodeAlreadyExists: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}codeAlreadyExists`;
      this.message = "Gateway with the new code already exists.";
    }
  },

  PermissionDeleteFailed: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Update.UC_CODE}permissionDeleteFailed`;
      this.message = "Failed to remove old uuEE permission.";
    }
  },

  PermissionCreateFailed: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Update.UC_CODE}permissionCreateFailed`;
      this.message = "Failed to create new uuEE permission.";
    }
  },

  GatewayDaoUpdateFailed: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Update.UC_CODE}gatewayDaoUpdateFailed`;
      this.message = "Failed to update gateway in uuAppObjectStore.";
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
