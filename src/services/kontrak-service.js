import { api } from "../config";

const create = async (payload) => {
  return await api.post("/kontrak", payload);
};

const findAll = async () => {
  return await api.get("/kontrak");
};

const kontrakService = {
  create,
  findAll,
};

export default kontrakService;
