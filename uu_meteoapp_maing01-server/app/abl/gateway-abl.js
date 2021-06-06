const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const logger = LoggerFactory.get("GatewayAbl");
const Errors = require("../api/errors/gateway-main-error.js");

const random = require("crypto-random-string");
const defaultsDeep = require("lodash.defaultsdeep");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
};

class GatewayAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("gateway");
    logger.warn("be careful about that !");
    //...
    logger.error("something went wrong!!");
    //...
    logger.fatal("fatal error!!!!!!!");
  }

  async create(awid, dtoIn) {
   

    // 2
    let validationResult = this.validator.validate("GatewayCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

    

    
    const enteredCode = dtoIn.hasOwnProperty("code");

    const defaults = {
      code: await this._generateUniqueCode(awid),
      name: "",
      location: null,
      locationDesc: "",
    };

    dtoIn = defaultsDeep(dtoIn, defaults);

    // 3
    if (enteredCode) {
      const existingGatewayByCode = await this.dao.getByCode(awid, dtoIn.code);
      if (existingGatewayByCode) {
        throw new Errors.Create.CodeIsNotUnique({ uuAppErrorMap }, { awid, code: dtoIn.code });
      }
    }
   
    // 3
    let gateway = { ...dtoIn };
    const gatewayDefaults = {
      awid,
      state: "created",
      today: {
        temperature: null,
        humidity: null,
        timestamp: null,
      },
      tommorow: {
        temperature: null,
        humidity: null,
      },
    };
    gateway = defaultsDeep(gateway, gatewayDefaults);
    try {
      gateway = await this.dao.create(gateway);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.GatewayDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // 4
    let dtoOut = { ...gateway, uuAppErrorMap };
    return dtoOut;
  }

  async list(awid, dtoIn) {
    // hds 1, 1.1
    let validationResult = this.validator.validate("GatewayListDtoInType", dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    // hds 2
    let dtoOut = await this.dao.listByVisibility(awid, true, dtoIn.pageInfo);

    // hds 3
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async _generateUniqueCode(awid) {
    let code = null;
    let instance = null;
    do {
      code = random(10);
    
    } while (instance !== null);
    return code;
  }






}

module.exports = new GatewayAbl();
