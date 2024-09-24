import { BACKEND_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useRatingLabels() {
  const { data: ratingLabels, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/rating/label`, {
          withCredentials: true,
        });

        return data;
      } catch (error) {
        return null;
      }
    },
    queryKey: ["rating-labels"],
    retry: false,
  });

  return { ratingLabels, isLoading };
}
