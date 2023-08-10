import Joi from "joi";

import schemaError from "./error";

const fileCustom = (value, helpers) => {
  if (!value) return helpers.error("any.invalid");

  if (value.length > 0) {
    const fileExtensions = ["pdf"];
    const maxFileSize = 2 * 1024 * 1024;
    const { name: filename, size, type: mimetype } = value[0];

    const extension = filename.split(".").pop().toLowerCase();
    if (!fileExtensions.includes(extension)) {
      return helpers.error("fileExtension.invalid");
    }

    if (size > maxFileSize) {
      return helpers.error("fileSize.max");
    }

    if (!mimetype.includes("pdf")) {
      return helpers.error("fileType.invalid");
    }

    return value;
  }

  return helpers.error("any.invalid");
};

const create = Joi.object({
  namaPengirim: Joi.string().min(3).max(255).required().label("Nama pengirim").error(schemaError),
  namaBankPengirim: Joi.string().min(3).max(255).required().label("Nama bank pengirim").error(schemaError),
  nomorRekeningPengirim: Joi.string().min(3).max(255).required().label("Nomor rekening pengirim").error(schemaError),
  namaPenerima: Joi.string().min(3).max(255).required().label("Nama penerima").error(schemaError),
  namaBankPenerima: Joi.string().min(3).max(255).required().label("Nama bank penerima").error(schemaError),
  nomorRekeningPenerima: Joi.string().min(3).max(255).required().label("Nomor rekening penerima").error(schemaError),
  jumlahPembayaran: Joi.number().min(1).required().label("Jumlah pembayaran").error(schemaError),
  buktiPembayaran: Joi.any().custom(fileCustom).required().label("Bukti pembayaran").error(schemaError),
});

const pembayaranSchema = { create };
export default pembayaranSchema;
