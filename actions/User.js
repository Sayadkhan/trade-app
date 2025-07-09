import apiService from "@/services/apiService";

const fetchUser = async () => {
  const response = await apiService.get("/user");
  return response.data;
};

const userUpdate = async (formData) => {
  return await apiService.post("/user/profile-update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { fetchUser, userUpdate };
