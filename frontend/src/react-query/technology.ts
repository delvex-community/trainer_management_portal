import { BACKEND_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export function useAllTechnologies() {
  const [searchParams] = useSearchParams();

  const { data: allTechnologies, isLoading } = useQuery({
    queryFn: async () => {
      const query = searchParams.get("query") || "";
      const page = searchParams.get("page") || "1";

      const { data } = await axios.get(`${BACKEND_URL}/technology/all`, {
        withCredentials: true,
        params: { query, page },
      });

      return data;
    },
    queryKey: ["all-technologies"],
  });

  return { allTechnologies, isLoading };
}
