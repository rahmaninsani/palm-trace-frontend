import { api } from "../config";

const create = async (payload) => {
  const result = await api.post("/kontrak", payload);
  return result.data;
};

const findAll = async () => {
  const result = await api.get("/kontrak");
  return result.data;
};

const findOne = async (idKontrak) => {
  const result = await api.get(`/kontrak/${idKontrak}`);
  return result.data;
};

const kontrakService = {
  create,
  findAll,
  findOne,
};

export default kontrakService;
