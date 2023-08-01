import { api } from "../config";

const getAll = async () => {
  return await api.get("/referensi-harga");
};

const getHistoryById = async (id) => {
  return await api.get(`/referensi-harga/${id}`);
};

const update = async (id, payload) => {
  return await api.put(`/referensi-harga/${id}`, {
    umurTanam: parseInt(payload.umurTanam),
    harga: parseFloat(payload.harga),
  });
};

export default { getAll, getHistoryById, update };
