import { Api } from "../config";

const register = async (user) => {
  return await Api.post("/users", user);
};

const login = async (user) => {
  return await Api.post("/users/login", {
    email: user.email,
    password: user.password,
  });
};

const getMe = async () => {
  return await Api.get("/users/me");
};

const logout = async () => {
  return await Api.delete("/users/logout");
};

export default { register, login, getMe, logout };
