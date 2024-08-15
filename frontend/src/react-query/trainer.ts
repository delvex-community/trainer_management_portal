import { BACKEND_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAllTrainers() {
  const { data: allTrainers, isLoading: loadingTrainers } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/trainer/all`, {
          withCredentials: true,
        });

        return data;
      } catch (error) {
        return null;
      }
    },
    queryKey: ["all-trainers"],
    retry: false,
  });

  return { allTrainers, loadingTrainers };
}

export function useTrainerById(trainerId: string) {
  const { data: trainer, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/trainer/${trainerId}`);

        return data;
      } catch (error) {
        return null;
      }
    },
    queryKey: ["trainer", trainerId],
  });

  return { trainer, isLoading };
}

export function useRating(trainerId: string) {
  const { data: rating, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/trainer/rating/${trainerId}`
        );

        return data;
      } catch (error) {
        return null;
      }
    },
    queryKey: ["rating", trainerId],
  });

  return { rating, isLoading };
}
