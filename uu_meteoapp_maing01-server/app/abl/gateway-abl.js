const {Validator} = require("uu_appg01_server").Validation;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const {ValidationHelper} = require("uu_appg01_server").AppServer;
const {LoggerFactory} = require("uu_appg01_server").Logging;
const logger = LoggerFactory.get("GatewayAbl");

const path = require("path");
const Errors = require("../api/errors/gateway-main-error");

const WARNINGS = {
    createUnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`    
    },
    listUnsupportedKeys : {
      code: `${Errors.List.UC_CODE}unsupportedKeys`
    },

  };
  

  class GatewayAbl  {
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
       // hds 1, 1.1
       let validationResult = this.validator.validate("GatewayCreateDtoInType", dtoIn);
    
       // hds 1.2, 1.3 // A1, A2
       let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
         WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);
    // hds 2
dtoIn.awid = awid;
let dtoOut;
try {
  dtoOut = await this.dao.create(dtoIn);
} catch (e) {
  if (e instanceof ObjectStoreError) { // A3
    throw new Errors.CreateGateway.GatewayDaoCreateFailed({uuAppErrorMap}, e);
   }
   throw e;
 }
   
// hds 3
dtoOut.uuAppErrorMap = uuAppErrorMap;
return dtoOut;
       }
      
        async list(awid, dtoIn)  {
          // hds 1, 1.1
          let validationResult = this.validator.validate("GatewayListDtoInType" ,dtoIn);

          // hds 1.2, 1.3 // A1, A2
          let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
            WARNINGS.listUnsupportedKeys.code, Errors.List.InvalidDtoIn);
      
          // hds 2
          let dtoOut = await this.dao.listByVisibility(awid, true, dtoIn.pageInfo);
      
          // hds 3
          dtoOut.uuAppErrorMap = uuAppErrorMap;
          return dtoOut;
        }
      }
          







     
  

  module.exports = new GatewayAbl();