import Joi from "joi";
import { tlds } from "@hapi/tlds";

import { bankConstant } from "../constants";
import schemaError from "./error";

const validateBank = (value, helpers) => {
  const bank = bankConstant.find((b) => b.name === value);
  if (!bank) {
    return helpers.error("any.invalid");
  }
  return value;
};

const updateDinas = Joi.object({
  nama: Joi.string().min(1).required().label("Nama").error(schemaError),
  nomorTelepon: Joi.string()
    .pattern(/^(\+)?[0-9]+$/)
    .min(10)
    .max(20)
    .required()
    .label("Nomor telepon")
    .error(schemaError),
  alamat: Joi.string().min(1).required().label("Alamat").error(schemaError),
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .min(5)
    .max(200)
    .required()
    .label("Email")
    .error(schemaError),
  password: Joi.string().allow("").label("Password").error(schemaError),
});

const updatePks = Joi.object({
  nama: Joi.string().min(1).required().label("Nama").error(schemaError),
  nomorTelepon: Joi.string()
    .pattern(/^(\+)?[0-9]+$/)
    .min(10)
    .max(20)
    .required()
    .label("Nomor telepon")
    .error(schemaError),
  siup: Joi.string().min(1).required().label("SIUP").error(schemaError),
  alamat: Joi.string().min(1).required().label("Alamat").error(schemaError),
  namaBank: Joi.string().required().custom(validateBank).label("Nama bank").error(schemaError),
  nomorRekening: Joi.string().required().label("Nomor rekening").error(schemaError),
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .min(5)
    .max(200)
    .required()
    .label("Email")
    .error(schemaError),
  password: Joi.string().allow("").label("Password").error(schemaError),
});

const updateKoperasi = Joi.object({
  nama: Joi.string().min(1).required().label("Nama").error(schemaError),
  nomorTelepon: Joi.string()
    .pattern(/^(\+)?[0-9]+$/)
    .min(10)
    .max(20)
    .required()
    .label("Nomor telepon")
    .error(schemaError),
  siup: Joi.string().min(1).required().label("SIUP").error(schemaError),
  alamat: Joi.string().min(1).required().label("Alamat").error(schemaError),
  namaBank: Joi.string().required().custom(validateBank).label("Nama bank").error(schemaError),
  nomorRekening: Joi.string().required().label("Nomor rekening").error(schemaError),
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .min(5)
    .max(200)
    .required()
    .label("Email")
    .error(schemaError),
  password: Joi.string().allow("").label("Password").error(schemaError),
});

const userSchema = { updatePks, updateKoperasi, updateDinas };
export default userSchema;
