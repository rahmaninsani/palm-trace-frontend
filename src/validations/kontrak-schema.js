import Joi from "joi";

import schemaError from "./error";

const create = Joi.object({
  idKoperasi: Joi.string().max(200).required().label("Mitra").error(schemaError),
  tanggalMulai: Joi.date().required().label("Tanggal mulai").error(schemaError),
  tanggalSelesai: Joi.date().required().label("Tanggal selesai").error(schemaError),
  kuantitas: Joi.number().min(1).required().label("Kuantitas").error(schemaError),
  harga: Joi.number().min(1).required().label("Harga").error(schemaError),
  totalHarga: Joi.string().label("Total harga").error(schemaError),
});

const kontrakSchema = { create };
export default kontrakSchema;
