import { api } from "../config";

const register = async (user) => {
  return await api.post("/users", user);
};

const login = async (user) => {
  return await api.post("/users/login", {
    email: user.email,
    password: user.password,
  });
};

const getMe = async () => {
  return await api.get("/users/me");
};

const logout = async () => {
  return await api.delete("/users/logout");
};

export default { register, login, getMe, logout };
