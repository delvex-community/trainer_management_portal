import { BACKEND_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAllTechnologies() {
  const { data: allTechnologies, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`${BACKEND_URL}/technology/all`, {
        withCredentials: true,
      });

      return data;
    },
    queryKey: ["all-technologies"],
  });

  return { allTechnologies, isLoading };
}
