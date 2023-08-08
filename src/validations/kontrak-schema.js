import Joi from "joi";

import schemaError from "./error";

const create = Joi.object({
  idKoperasi: Joi.string()
    .pattern(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)
    .required()
    .label("Koperasi")
    .error(schemaError),
  tanggalMulai: Joi.date().required().label("Tanggal mulai").error(schemaError),
  tanggalSelesai: Joi.date().required().label("Tanggal selesai").error(schemaError),
  kuantitas: Joi.number().min(1).required().label("Kuantitas").error(schemaError),
  harga: Joi.number().min(1).required().label("Harga").error(schemaError),
  totalHarga: Joi.string().label("Total harga").error(schemaError),
});

const confirm = Joi.object({
  status: Joi.number().valid(1, 2).required().label("Status").error(schemaError),
  pesan: Joi.string().required().label("Pesan").error(schemaError),
});

const kontrakSchema = { create, confirm };
export default kontrakSchema;
