import apiService from "@/services/apiService";

const fetchGlobalSettings = async () => {
  const response = await apiService.get("/settings");
  return response.data;
};

export default fetchGlobalSettings;
