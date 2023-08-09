import { api } from "../config";

const create = async (payload) => {
  const result = await api.post("/users/kebun", payload.data);
  return result.data;
};

const findAll = async () => {
  const result = await api.get("/users/kebun");
  return result.data;
};

const kebunService = {
  create,
  findAll,
};

export default kebunService;
