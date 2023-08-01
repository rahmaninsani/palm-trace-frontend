import { api } from "../config";

const findAll = async (payload) => {
  return await api.get("/users", {
    params: {
      userType: payload.userType,
    },
  });
};

const userService = {
  findAll,
};

export default userService;
