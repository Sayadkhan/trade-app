import apiService from "@/services/apiService";

const fetchMatrix = async ({ params }) => {
  const response = await apiService.get("/user/matrix", {
    params,
  });
  return response.data;
};

const createMatrix = async (data) => {
  const response = await apiService.post("/user/matrix/store", data);
  return response;
};

export { fetchMatrix, createMatrix };
