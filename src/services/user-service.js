import { api } from "../config";

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
  findAll,
  findOne,
};

export default userService;
