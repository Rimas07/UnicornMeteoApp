const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const logger = LoggerFactory.get("GatewayAbl");
const Errors = require("../api/errors/gateway-main-error.js");

const defaultsDeep = require("lodash.defaultsdeep");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
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
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    const defaults = {
      name: "",
      location: null,
      locationDesc: "",
    };

    dtoIn = defaultsDeep(dtoIn, defaults);

    // 3
    let gateway = { ...dtoIn };
    const gatewayDefaults = {
      awid,
      state: "created",
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

  async get(awid, dtoIn) {
    // 2
    let validationResult = this.validator.validate("GatewayGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.get.unsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // 3
    let gateway;
    let identifier;
    if (dtoIn.id) {
      identifier = "id";
      gateway = await this.dao.get(awid, dtoIn.id);
    }

    if (!gateway) {
      const errorParams = {
        awid,
        [identifier]: dtoIn[identifier],
      };
      throw new Errors.Get.GatewayDoesNotExist({ uuAppErrorMap }, errorParams);
    }

    // 4
    let dtoOut = { ...gateway, uuAppErrorMap };
    return dtoOut;
  }

  async delete(dtoIn) {
    // hds 1, 1.1
    let validationResult = this.validator.validate("GatewayDeleteDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    if (!Array.isArray(dtoIn.id)) dtoIn.id = [dtoIn.id];

    // hds 2
    let dtoOut;
    try {
      dtoOut = await this.dao.delete(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A3
        throw new Errors.Delete.GatewayDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 3
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
  async list(awid, dtoIn) {
    // 2
    let validationResult = this.validator.validate("GatewayListDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    const defaults = {
      pageInfo: {
        pageIndex: 0,
        pageSize: 100,
      },
    };
    dtoIn = defaultsDeep(dtoIn, defaults);

    // 4
    let dtoOut;
    if (dtoIn.state) {
      dtoOut = await this.dao.listByState(awid, dtoIn.state, dtoIn.pageInfo);
    } else {
      dtoOut = await this.dao.list(awid, dtoIn.pageInfo);
    }

    // 5
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new GatewayAbl();
