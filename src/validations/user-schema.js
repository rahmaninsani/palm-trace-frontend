import Joi from "joi";
import { tlds } from "@hapi/tlds";

import { bankConstant } from "../constants";
import schemaError from "./error";

const validateBank = (value, helpers) => {
  const bank = bankConstant.find((bank) => bank.name === value);

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

const updatePetani = Joi.object({
  nama: Joi.string().min(1).required().label("Nama").error(schemaError),
  nomorTelepon: Joi.string()
    .pattern(/^(\+)?[0-9]+$/)
    .min(10)
    .max(20)
    .required()
    .label("Nomor telepon")
    .error(schemaError),
  nik: Joi.string()
    .pattern(/^\d{16}$/)
    .required()
    .label("NIK")
    .error(schemaError),
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
  idKoperasi: Joi.string()
    .pattern(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)
    .label("Koperasi")
    .error(schemaError),
});

const createKebunPetani = Joi.object({
  latitude: Joi.number().min(-90).max(90).required().label("Latitude").error(schemaError),
  longitude: Joi.number().min(-180).max(180).required().label("Longitude").error(schemaError),
  alamat: Joi.string().min(1).required().label("Alamat").error(schemaError),
  luas: Joi.number().min(1).required().label("Luas").error(schemaError),
  kemampuanProduksiHarian: Joi.number().min(1).required().label("Kemampuan produksi harian").error(schemaError),
});

const userSchema = { updatePks, updateKoperasi, updateDinas, updatePetani, createKebunPetani };
export default userSchema;
