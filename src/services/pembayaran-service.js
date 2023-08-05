import { api } from "../config";

const create = async (payload) => {
  const result = await api.post(`/kontrak/${payload.idKontrak}/delivery-order/${payload.idDeliveryOrder}/transaksi/${payload.idTransaksi}/pembayaran`);
  return result.data;
};

const findAll = async (payload) => {
  const result = await api.get(`/kontrak/${payload.idKontrak}/delivery-order/${payload.idDeliveryOrder}/transaksi/${payload.idTransaksi}/pembayaran`);
  return result.data;
};

const pembayaranService = {
  create,
  findAll,
};

export default pembayaranService;
