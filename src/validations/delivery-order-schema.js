import Joi from "joi";

import schemaError from "./error";

const create = Joi.object({
  periode: Joi.date().required().label("Periode").error(schemaError),
  rendemen: Joi.number().min(1).max(100).required().label("Rendemen").error(schemaError),
  kuantitas: Joi.number().min(1).required().label("Kuantitas").error(schemaError),
  harga: Joi.number().min(1).required().label("Harga").error(schemaError),
  totalHarga: Joi.string().label("Total harga").error(schemaError),
});

const confirm = Joi.object({
  status: Joi.number().valid(1, 2).required().label("Status").error(schemaError),
  pesan: Joi.string().required().label("Pesan").error(schemaError),
});

const deliveryOrderSchema = { create, confirm };
export default deliveryOrderSchema;
