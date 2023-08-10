import Joi from "joi";

import schemaError from "./error";

const create = Joi.object({
  idKebun: Joi.string()
    .pattern(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)
    .required()
    .label("Kebun")
    .error(schemaError),
  umurTanam: Joi.number().min(1).required().label("Umur Tanam").error(schemaError),
  kuantitas: Joi.number().min(1).required().label("Kuantitas").error(schemaError),
  harga: Joi.number().min(1).required().label("Harga").error(schemaError),
});

const confirm = Joi.object({
  status: Joi.number().valid(1, 2).required().label("Status").error(schemaError),
  pesan: Joi.string().required().label("Pesan").error(schemaError),
});

const transaksiSchema = { create, confirm };
export default transaksiSchema;
