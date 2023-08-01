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

  laporan: "/laporan",

  profil: "/profil",
};

export default endpoint;
