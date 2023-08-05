import Joi from "joi";

import schemaError from "./error";

const create = Joi.object({
  kuantitas: Joi.number().min(1).required().label("Kuantitas").error(schemaError),
});

const penerimaanSchema = { create };
export default penerimaanSchema;
