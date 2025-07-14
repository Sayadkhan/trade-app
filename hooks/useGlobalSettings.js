import fetchGlobalSettings from "@/actions/settings";
import { useQuery } from "@tanstack/react-query";

const useGlobalSettings = () => {
  return useQuery({
    queryKey: ["global-settings"],
    queryFn: () => fetchGlobalSettings(),
  });
};

export default useGlobalSettings;
