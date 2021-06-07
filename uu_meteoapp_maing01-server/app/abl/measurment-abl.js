"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/measurment-error.js");

//const defaultsDeep = require("lodash.defaultsdeep");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};

/*const DATASET_TYPES = {
        hourly: {
          labelFormat: "YYYY-MM-DDTHH",
          entryOffset: {
            hours: 2,
          },
        },
        daily: {
          labelFormat: "YYYY-MM-DD",
          entryOffset: {
            days: 1,
          },
        },
    };*/

class MeasurmentAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("measurment");
  }
  async create(dtoIn) {
    // hds 1, 1.1
    let validationResult = this.validator.validate("MeasurmentInsertDtoInType", dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Insert.InvalidDtoIn
    );

    if (Array.isArray(dtoIn)) {
      dtoIn.forEach((entry) => {
        let expireAt = new Date(entry.timestamp);
        expireAt.setDate(expireAt.getDate() + 3);
        entry.timestamp = new Date(entry.timestamp);
        entry.expireAt = expireAt;
        entry.deviceId = `${associatedDevice.id}`;
      });
    } else {
      let expireAt = new Date(entry.timestamp);
      expireAt.setDate(expireAt.getDate() + 3);
      dtoIn.timestamp = new Date(dtoIn.timestamp);
      dtoIn.expireAt = expireAt;
      entry.GatewayId = `${associatedGateway.id}`;
    }

    // hds 2.2
    let dtoOut;
    try {
      dtoOut = await this.dao.insert(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A3
        throw new Errors.Insert.MesurmentDaoInsertFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
  }
}
module.exports = new MeasurmentAbl();
