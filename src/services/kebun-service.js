import { api } from "../config";

const create = async (payload) => {
  payload.luas = parseFloat(payload.luas);

  return await api.post("/users/kebun", payload);
};

const findAll = async () => {
  return await api.get("/users/kebun");
};

const kebunService = {
  create,
  findAll,
};

export default kebunService;
