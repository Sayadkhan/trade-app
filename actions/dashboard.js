import apiService from "@/services/apiService";

const fetchDashboard = async () => {
  const response = await apiService.get("/user/dashboard");
  return response.data;
};

export default fetchDashboard;
