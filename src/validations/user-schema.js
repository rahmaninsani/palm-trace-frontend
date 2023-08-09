import Joi from "joi";
import { tlds } from "@hapi/tlds";

import { bankConstant } from "../constants";
import schemaError from "./error";

const fileCustom = (value, helpers) => {
  if (!value) return helpers.error("any.invalid");

  if (value.length > 0) {
    const fileExtensions = ["pdf", "jpg", "jpeg", "png"];
    const maxFileSize = 2 * 1024 * 1024;
    const { name: filename, size, type: mimetype } = value[0];

    const extension = filename.split(".").pop().toLowerCase();
    if (!fileExtensions.includes(extension)) {
      return helpers.error("fileExtension.invalid");
    }

    if (size > maxFileSize) {
      return helpers.error("fileSize.max");
    }

    if (!mimetype.includes("image") && !mimetype.includes("pdf")) {
      return helpers.error("fileType.invalid");
    }

    return value;
  }

  return helpers.error("any.invalid");
};

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
  nomorSuratKeteranganLurah: Joi.string().min(1).required().label("Nomor surat keterangan lurah").error(schemaError),
  suratKeteranganLurah: Joi.any().custom(fileCustom).required().label("Surat keterangan lurah").error(schemaError),
  nomorSuratKeteranganGantiRugi: Joi.string().min(1).required().label("Nomor surat keterangan ganti rugi").error(schemaError),
  suratKeteranganGantiRugi: Joi.any().custom(fileCustom).required().label("Surat keterangan ganti rugi").error(schemaError),
  nomorSertifikatHakMilik: Joi.string().min(1).required().label("Nomor sertifikat hak milik").error(schemaError),
  sertifikatHakMilik: Joi.any().custom(fileCustom).required().label("Sertifikat hak milik").error(schemaError),
  nomorSuratTandaBudidaya: Joi.string().min(1).required().label("Nomor surat tanda budidaya").error(schemaError),
  suratTandaBudidaya: Joi.any().custom(fileCustom).required().label("Surat tanda budidaya").error(schemaError),
  nomorSertifikatRspo: Joi.string().min(1).required().label("Nomor sertifikat rspo").error(schemaError),
  sertifikatRspo: Joi.any().custom(fileCustom).required().label("Sertifikat rspo").error(schemaError),
  nomorSertifikatIspo: Joi.string().min(1).required().label("Nomor sertifikat ispo").error(schemaError),
  sertifikatIspo: Joi.any().custom(fileCustom).required().label("Sertifikat ispo").error(schemaError),
  nomorSertifikatIscc: Joi.string().min(1).required().label("Nomor sertifikat iscc").error(schemaError),
  sertifikatIscc: Joi.any().custom(fileCustom).required().label("Sertifikat iscc").error(schemaError),
});

const userSchema = { updatePks, updateKoperasi, updateDinas, updatePetani, createKebunPetani };
export default userSchema;
