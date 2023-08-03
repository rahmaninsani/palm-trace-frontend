import Joi from "joi";
import { tlds } from "@hapi/tlds";

import schemaError from "./error";

const register = Joi.object({
  role: Joi.string().valid("dinas", "petani", "koperasi", "pks").required().label("Jenis akun").error(schemaError),
  nama: Joi.string().max(200).required().label("Nama").error(schemaError),
  alamat: Joi.string().min(2).required().label("Alamat").error(schemaError),
  nomorTelepon: Joi.string()
    .pattern(/^(\+)?[0-9]+$/)
    .min(10)
    .max(20)
    .required()
    .label("Nomor telepon")
    .error(schemaError),
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .min(5)
    .max(200)
    .required()
    .label("Email")
    .error(schemaError),
  password: Joi.string().min(8).max(200).required().label("Password").error(schemaError),
});

const login = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .min(5)
    .max(200)
    .required()
    .label("Email")
    .error(schemaError),
  password: Joi.string().min(8).max(200).required().label("Password").error(schemaError),
});

const authSchema = { register, login };
export default authSchema;
