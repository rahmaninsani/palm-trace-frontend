import { Api } from "../config";

const kebunCreate = async (payload) => {
  payload.luas = parseFloat(payload.luas);

  return await Api.post("/users/kebun", payload);
};

const kebunFindAll = async () => {
  return await Api.get("/users/kebun");
};

const UserService = {
  kebunCreate,
  kebunFindAll,
};

export default UserService;
