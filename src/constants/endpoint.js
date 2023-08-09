const endpoint = {
  register: "/register",
  login: "/login",

  dashboard: "/dashboard",

  referensiHarga: "/referensi-harga",
  referensiHargaTambah: "/referensi-harga/tambah",

  kontrak: "/kontrak",
  kontrakTambah: "/kontrak/tambah",
  kontrakDetail: "/kontrak/:idKontrak",

  deliveryOrderTambah: "/kontrak/:idKontrak/tambah",
  deliveryOrderDetail: "/kontrak/:idKontrak/:idDeliveryOrder",

  transaksiTambah: "/kontrak/:idKontrak/:idDeliveryOrder/tambah",
  transaksiDetail: "/kontrak/:idKontrak/:idDeliveryOrder/:idTransaksi",

  laporan: "/laporan",

  profil: "/profil",

  kebun: "/profil/kebun",
  kebunTambah: "/profil/kebun/tambah",

  tidakDitemukan: "/tidak-ditemukan",
};

export default endpoint;
