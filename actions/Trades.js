import apiService from "@/services/apiService";

const fetchTradesPredection = async ({ page = 1 }) => {
  const response = await apiService.get(
    `/user/trade-prediction/crypto?page=${page}`
  );
  return response.data;
};

const fetchTradesStatistics = async () => {
  const response = await apiService.get("/user/trade-prediction/statistics");
  return response.data;
};

const fetchTradesHistoryLogs = async (params) => {
  const response = await apiService.get("/user/trade-prediction", {
    params,
  });
  return response.data;
};

export { fetchTradesPredection, fetchTradesStatistics, fetchTradesHistoryLogs };
