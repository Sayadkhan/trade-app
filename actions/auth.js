import apiService from "@/services/apiService";

const userSignUp = async (formData) => {
  return await apiService.post("/auth/register", formData);
};

const userSignIn = async (formData) => {
  return await apiService.post("/auth/login", formData);
};

const userLogout = async () => {
  return await apiService.post("/user/logout", {});
};

const userForgotPassword = async (formData) => {
  return await apiService.post("/auth/forgot-password", formData);
};

const userChangePassword = async (formData) => {
  return await apiService.post("/auth/reset-password", formData);
};

export {
  userSignUp,
  userSignIn,
  userLogout,
  userForgotPassword,
  userChangePassword,
};
