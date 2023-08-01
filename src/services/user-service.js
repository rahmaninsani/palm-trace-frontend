import { api } from "../config";

const findAll = async (payload) => {
  const result = await api.get("/users", {
    params: {
      userType: payload.userType,
    },
  });

  return result.data;
};

const userService = {
  findAll,
};

export default userService;
