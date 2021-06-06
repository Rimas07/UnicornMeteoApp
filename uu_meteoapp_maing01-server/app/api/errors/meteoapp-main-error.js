"use strict";
const MeteoappMainUseCaseError = require("./meteoapp-main-use-case-error.js");
const METEO_APP_MAIN_ERROR_PREFIX = `${MeteoappMainUseCaseError.ERROR_PREFIX}/MeteoappMain`

const Init = {
  UC_CODE: `${METEO_APP_MAIN_ERROR_PREFIX}init/`,

 

  InvalidDtoIn: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  CreateAwscFailed: class extends MeteoappMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },

  
};

module.exports = {
  Init,
};
