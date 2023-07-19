const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

export { formatCurrency };
