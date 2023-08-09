const fileExtensions = ["pdf", "jpg", "jpeg", "png"];
const maxFileSize = 2 * 1024 * 1024;

const schemaError = (errors) => {
  errors.forEach((err) => {
    switch (err.code) {
      case "string.empty":
        err.message = `${err.local.label} tidak boleh kosong`;
        break;
      case "string.min":
        err.message = `Panjang ${err.local.label.toLowerCase()} paling sedikit ${err.local.limit} karakter`;
        break;
      case "string.max":
        err.message = `Panjang ${err.local.label.toLowerCase()} paling banyak ${err.local.limit} karakter`;
        break;
      case "string.email":
        err.message = `${err.local.label} tidak valid`;
        break;
      case "string.base":
        err.message = `${err.local.label} tidak valid`;
        break;
      case "any.only":
        err.message = `${err.local.label} tidak valid`;
        break;
      case "any.invalid":
        err.message = `${err.local.label} tidak valid`;
        break;
      case "string.pattern.base":
        err.message = `${err.local.label} tidak valid`;
        break;
      case "number.base":
        err.message = `${err.local.label} tidak valid`;
        break;
      case "number.min":
        err.message = `${err.local.label} paling sedikit ${err.local.limit} karakter`;
        break;
      case "number.max":
        err.message = `${err.local.label} paling banyak ${err.local.limit} karakter`;
        break;
      case "date.base":
        err.message = `${err.local.label} tidak valid`;
        break;
      case "fileSize.max":
        err.message = `Ukuran file ${err.local.label.toLowerCase()} maksimal ${maxFileSize / 1024 / 1024} MB`;
        break;
      case "fileExtension.invalid":
        err.message = `Ekstensi file ${err.local.label.toLowerCase()} yang diperbolehkan adalah ${fileExtensions.join(", ")}`;
        break;
      case "fileType.invalid":
        err.message = `Tipe file ${err.local.label.toLowerCase()} yang diperbolehkan adalah ${fileExtensions.join(", ")}`;
        break;
      default:
        break;
    }
  });
  return errors;
};

export default schemaError;
