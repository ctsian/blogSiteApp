export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
};

export const getUsername = () => localStorage.getItem("userName");
