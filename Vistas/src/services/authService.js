import api from "./api";

export const login = (credentials) => api.post("/auth/login", credentials);

export const register = (data) => api.post("/auth/registrar", data);

export const logout = () => {
  localStorage.removeItem("token");
};
