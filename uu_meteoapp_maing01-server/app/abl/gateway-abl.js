const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const logger = LoggerFactory.get("GatewayAbl");
const Errors = require("../api/errors/gateway-main-error.js");

const random = require("crypto-random-string");
const defaultsDeep = require("lodash.defaultsdeep");
const moment = require("moment-timezone");

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

    const validTimezones = moment.tz.names();
    if (!validTimezones.includes(dtoIn.timezone)) {
      throw new Errors.Create.InvalidTimezone({ uuAppErrorMap }, { timezone: dtoIn.timezone, validTimezones });
    }

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

    // 6
    let gateway = { ...dtoIn };
    const gatewayDefaults = {
      awid,
      state: "created",
      log: [],
      current: {
        temperature: null,
        humidity: null,
        timestamp: null,
      },
      min: {
        temperature: null,
        humidity: null,
      },
      max: {
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

    // 7
    let dtoOut = { ...gateway, uuAppErrorMap };
    return dtoOut;
  }
  async _generateUniqueCode(awid) {
    let code = null;
    let instance = null;
    do {
      code = random(10);
      instance = await this.dao.getByCode(awid, code);
    } while (instance !== null);
    return code;
  }
  async get(awid, dtoIn, authorizationResult) {
   

    // 2
    let validationResult = this.validator.validate("gatewayGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.get.unsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );



    // 4
    let gateway;
    let identifier;
    if (dtoIn.id) {
      identifier = "id";
      gateway = await this.dao.get(awid, dtoIn.id);
    } else  (dtoIn.code) 
      identifier = "code";
      gateway = await this.dao.getByCode(awid, dtoIn.code);
  

    if (!gateway) {
      const errorParams = {
        awid,
        [identifier]: dtoIn[identifier],
      };
      throw new Errors.Get.GatewayDoesNotExist({ uuAppErrorMap }, errorParams);
    }

    // 5
    let dtoOut = { ...gateway, uuAppErrorMap };
    return dtoOut;
  }

  async update(awid, dtoIn) {
    // 2
    let validationResult = this.validator.validate("GatewayCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    if (dtoIn.timezone) {
      const validTimezones = moment.tz.names();
      if (!validTimezones.includes(dtoIn.timezone)) {
        throw new Errors.Update.InvalidTimezone({ uuAppErrorMap }, { timezone: dtoIn.timezone, validTimezones });
      }
    }

    // 3
    let gateway = await this.dao.get(awid, dtoIn.id);
    if (!gateway) {
      throw new Errors.Update.GatewayDoesNotExist({ uuAppErrorMap }, { awid, id: dtoIn.id });
    }

    // 4
    if (gateway.state === "closed" && dtoIn.state !== "closed") {
      throw new Errors.Update.GatewayIsNotInCorrectState(
        { uuAppErrorMap },
        { awid, id: dtoIn.id, state: gateway.state }
      );
    }

    // 5
    if (dtoIn.code && dtoIn.code !== gateway.code) {
      const collidingGateway = await this.dao.getByCode(awid, dtoIn.code);
      if (collidingGateway) {
        throw new Errors.Update.CodeAlreadyExists({ uuAppErrorMap }, { awid, code: dtoIn.code });
      }
      ValidationHelper.addWarning(
        uuAppErrorMap,
        WARNINGS.update.gatewayCodeIsChanged.code,
        WARNINGS.update.gatewayCodeIsChanged.message,
        { awid, oldCode: gateway.code, newCode: dtoIn.code }
      );
    }

    // 7
    gateway = defaultsDeep(dtoIn, gateway);
    try {
      gateway = await this.dao.update(gateway);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.GatewayDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // 8
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
