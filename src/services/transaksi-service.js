import { api } from "../config";

const create = async (payload) => {
  const result = await api.post(`/kontrak/${payload.idKontrak}/delivery-order/${payload.idDeliveryOrder}/transaksi`, payload.data);
  return result.data;
};

const confirm = async (payload) => {
  const result = await api.put(`/kontrak/${payload.idKontrak}/delivery-order/${payload.idDeliveryOrder}/transaksi/${payload.idTransaksi}`, payload.data);
  return result.data;
};

const findAll = async (payload) => {
  const result = await api.get(`/kontrak/${payload.idKontrak}/delivery-order/${payload.idDeliveryOrder}/transaksi`);
  return result.data;
};

const findOne = async (payload) => {
  const result = await api.get(`/kontrak/${payload.idKontrak}/delivery-order/${payload.idDeliveryOrder}/transaksi/${payload.idTransaksi}`);
  return result.data;
};

const findAllByUser = async () => {
  const result = await api.get(`/transaksi`);
  return result.data;
};

const findAllByUserThisWeek = async () => {
  const result = await api.get(`/transaksi/this-week`);
  return result.data;
};

const transaksiService = {
  create,
  confirm,
  findAll,
  findOne,
  findAllByUser,
  findAllByUserThisWeek,
};

export default transaksiService;
