import Joi from "joi";
import { tlds } from "@hapi/tlds";

import schemaError from "./error";

const register = Joi.object({
  role: Joi.string().valid("dinas", "petani", "koperasi", "pks").required(),
  nama: Joi.string().max(200).required(),
  alamat: Joi.string().required(),
  nomorTelepon: Joi.string().required(),
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
