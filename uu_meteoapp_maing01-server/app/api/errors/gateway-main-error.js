const  GatewayMainUseCaseError= require("./gateway-main-use-case-error");

const Create = {
  UC_CODE: `${GatewayMainUseCaseError.ERROR_PREFIX}gateway/create/`,

  InvalidDtoIn: class extends GatewayMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};
  const List= {
    UC_CODE: `${GatewayMainUseCaseError.ERROR_PREFIX}gateway/list/`,
  
    InvalidDtoIn: class extends GatewayMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${Create.UC_CODE}invalidDtoIn`;
        this.message = "DtoIn is not valid.";
      }
    },
  
GatewayDaoCreateFailed:class extends GatewayMainUseCaseError {
  constructor() {
    super(...arguments);
    this.code = `${Create.UC_CODE}GatewayDaoCreateFailed`;
    this.message = "Create gateway by gateway Dao create failed.";
  }
},

};

module.exports = {
  Create,
  List
};