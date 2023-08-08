import { api } from "../config";

const update = async (payload) => {
  const result = await api.put("/users/profil", payload.data);

  return result.data;
};

const findAll = async (payload) => {
  const result = await api.get("/users", {
    params: {
      userType: payload.userType,
    },
  });

  return result.data;
};

const findOne = async () => {
  const result = await api.get("/users/profil");

  return result.data;
};

const userService = {
  update,
  findAll,
  findOne,
};

export default userService;
