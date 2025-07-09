import { fetchTradesPredection } from "@/actions/Trades";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useTradePredictions = ({ page = 1 }) => {
  return useQuery({
    queryKey: ["tradePredictions", page],
    queryFn: () => fetchTradesPredection({ page }),
    placeholderData: keepPreviousData,
  });
};

export default useTradePredictions;
