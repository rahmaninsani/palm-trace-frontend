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
      default:
        break;
    }
  });
  return errors;
};

export default schemaError;
