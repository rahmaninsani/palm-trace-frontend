import { api } from "../config";

const create = async (payload) => {
  const result = await api.post(`/kontrak/${payload.idKontrak}/delivery-order/${payload.idDeliveryOrder}/transaksi/${payload.idTransaksi}/penerimaan`, payload.data);
  return result.data;
};

const findAll = async (payload) => {
  const result = await api.get(`/kontrak/${payload.idKontrak}/delivery-order/${payload.idDeliveryOrder}/transaksi/${payload.idTransaksi}/penerimaan`);
  return result.data;
};

const penerimaanService = {
  create,
  findAll,
};

export default penerimaanService;
