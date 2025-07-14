import { fetchMatrix } from "@/actions/matrix";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useMatrix = ({ params }) => {
  return (
    useQuery < MatrixResponse,
    Error >
      {
        queryKey: ["matrix", params],
        queryFn: () => fetchMatrix({ params }),
        placeholderData: keepPreviousData,
      }
  );
};

export default useMatrix;
