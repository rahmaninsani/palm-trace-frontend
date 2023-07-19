import { Api } from "../config";

const getAll = async () => {
  return await Api.get("/referensi-harga");
};

const getHistoryById = async (id) => {
  return await Api.get(`/referensi-harga/${id}`);
};

export default { getAll, getHistoryById };
