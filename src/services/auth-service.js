import { api } from "../config";

const register = async (user) => {
  const result = await api.post("/users", user);
  return result.data;
};

const login = async (user) => {
  const result = await api.post("/users/login", {
    email: user.email,
    password: user.password,
  });
  return result.data;
};

const getMe = async () => {
  const result = await api.get("/users/me");
  return result.data;
};

const logout = async () => {
  const result = await api.delete("/users/logout");
  return result.data;
};

export default { register, login, getMe, logout };
