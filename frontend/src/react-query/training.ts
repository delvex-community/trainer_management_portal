import { BACKEND_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAllTrainings() {
  const { data: allTrainings, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`${BACKEND_URL}/training/all`, {
        withCredentials: true,
      });

      return data;
    },
    queryKey: ["all-trainings"],
  });

  return { allTrainings, isLoading };
}

export function useTrainerTrainings(trainerId: string) {
  const { data: trainerTrainings, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`${BACKEND_URL}/training/${trainerId}`, {
        withCredentials: true,
      });

      return data;
    },
    queryKey: ["trainer-trainings", trainerId],
  });

  return { trainerTrainings, isLoading };
}
