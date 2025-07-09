import apiService from "@/services/apiService";

// Fetch all investment plans (schemes)
const fetchInvestmentsScheme = async (params) => {
  const response = await apiService.get("/user/investments/funds", { params });
  return response;
};

// Fetch investment statistics (e.g., total invested, profit, etc.)
const fetchInvestmentsStatistics = async (params) => {
  const response = await apiService.get("/user/investments", { params });
  return response;
};

// Submit a new investment
const investmentNow = async (formData) => {
  return await apiService.post("/user/investments/store", formData);
};

// Cancel an active investment
const investmentCancelAction = async (formData) => {
  return await apiService.post("/user/investments/cancel", formData);
};

// Re-invest from a matured investment
const reInvestmentAction = async (formData) => {
  const response = await apiService.post(
    "/user/investments/make-re-investment",
    formData
  );
  return response;
};

// Mark investment as complete and transfer funds
const completeInvestmentAction = async (formData) => {
  return await apiService.post(
    "/user/investments/complete-investment-transfer",
    formData
  );
};

export {
  fetchInvestmentsScheme,
  fetchInvestmentsStatistics,
  investmentNow,
  investmentCancelAction,
  reInvestmentAction,
  completeInvestmentAction,
};
