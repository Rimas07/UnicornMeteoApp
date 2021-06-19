"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/measurement-error.js");


const WARNINGS = {
  createUnsupportedKeys: {
    code: `unsupportedKeys`,
  },
};

class MeasurementAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("measurement");
  }

  async enter(dtoIn) {
    // hds 1, 1.1
    let validationResult = this.validator.validate("MeasurementEnterDtoInType", dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Enter.InvalidDtoIn
    );
    


    if (dtoIn) {
      dtoIn((entry) => {
        let expireAt = new Date(entry.timestamp);
        expireAt.setDate(expireAt.getDate() + 3);
        entry.timestamp = new Date(entry.timestamp);
        entry.expireAt = expireAt;
        entry.gatewayId = `${gatewayDefaults.id}`;
      });
    } else {
      let expireAt = new Date(entry.timestamp);
      expireAt.setDate(expireAt.getDate() + 3);
      dtoIn.timestamp = new Date(dtoIn.timestamp);
      dtoIn.expireAt = expireAt;
      entry.gatewayId = `${gatewayDefaults.id}`;
    }

    // hds 2.2
    let dtoOut;
    try {
      dtoOut = await this.dao.enter(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A3
        throw new Errors.Enter.MeasurementDaoEnterFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 3
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
 // hds 4



 
  async get(dtoIn, useOldMethod) {
    // hds 1, 1.1
    let validationResult = this.validator.validate("MeasurementGetDtoInType", dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Enter.InvalidDtoIn
    );
    // hds 2.1
    let gateway = await DaoFactory.getDao("gateway").get(dtoIn);
    if (!gateway) {
      throw new Errors.Get.GatewayDoesntExist({ uuAppErrorMap }, { gatewayId: dtoIn.gatewayId });
    }

    // hds 2.2
    let dtoOut;
    try {
      dtoOut = useOldMethod ? await this.dao.getOld(dtoIn) : await this.dao.get(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A3
        throw new Errors.Get.MeasurementLoadFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 3
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async purge() {
    return await this.dao.purge();
  }
}

module.exports = new MeasurementAbl();
