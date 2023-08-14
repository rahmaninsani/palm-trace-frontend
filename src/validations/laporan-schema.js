import Joi from "joi";

import schemaError from "./error";

const create = Joi.object({
  periode: Joi.date().required().label("Periode").error(schemaError),
});

const laporanSchema = { create };
export default laporanSchema;
