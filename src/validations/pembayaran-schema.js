import Joi from "joi";

import schemaError from "./error";

const create = Joi.object({
  jumlahBayar: Joi.number().min(1).required().label("Jumlah bayar").error(schemaError),
  buktiBayar: Joi.required().label("Bukti bayar").error(schemaError),
});

const pembayaranSchema = { create };
export default pembayaranSchema;
