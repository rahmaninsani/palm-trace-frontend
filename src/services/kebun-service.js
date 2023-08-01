import { api } from "../config";

const create = async (payload) => {
  payload.luas = parseFloat(payload.luas);
  const result = await api.post("/users/kebun", payload);
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
