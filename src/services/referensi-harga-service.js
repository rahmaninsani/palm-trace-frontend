import { api } from "../config";

const getAll = async () => {
  const result = await api.get("/referensi-harga");
  return result.data;
};

const getHistoryById = async (id) => {
  const result = await api.get(`/referensi-harga/${id}`);
  return result.data;
};

const update = async (id, payload) => {
  const result = await api.put(`/referensi-harga/${id}`, {
    umurTanam: parseInt(payload.umurTanam),
    harga: parseFloat(payload.harga),
  });
  return result.data;
};

export default { getAll, getHistoryById, update };
