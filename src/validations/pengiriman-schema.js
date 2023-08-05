import Joi from "joi";

import schemaError from "./error";

const create = Joi.object({
  namaSopir: Joi.string().min(1).required().label("Pengiriman").error(schemaError),
  nomorTeleponSopir: Joi.string()
    .pattern(/^(\+)?[0-9]+$/)
    .min(10)
    .max(20)
    .required()
    .label("Nomor telepon sopir")
    .error(schemaError),
  namaKendaraan: Joi.string().min(1).required().label("Nama kendaraan").error(schemaError),
  nomorPolisiKendaraan: Joi.string().min(1).required().label("Nomor polisi kendaraan").error(schemaError),
});

const pengirimanSchema = { create };
export default pengirimanSchema;
