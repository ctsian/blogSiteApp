import api from "../api/axios";

export const register = (data) =>
  api.post("/api/v1.0/blogsite/user/register", data);

export const login = async (data) => {
  const res = await api.post("/api/v1.0/blogsite/user/login", data);
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("userName", res.data.userName);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
};
