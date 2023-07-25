import { Api } from "../config";

const getAll = async () => {
  return await Api.get("/referensi-harga");
};

const getHistoryById = async (id) => {
  return await Api.get(`/referensi-harga/${id}`);
};

const update = async (id, payload) => {
  return await Api.put(`/referensi-harga/${id}`, {
    umurTanam: parseInt(payload.umurTanam),
    harga: parseFloat(payload.harga),
  });
};

export default { getAll, getHistoryById, update };
