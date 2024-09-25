import { BACKEND_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export function useAllTrainings() {
  const [searchParams] = useSearchParams();

  const { data: allTrainings, isLoading } = useQuery({
    queryFn: async () => {
      const query = searchParams.get("query") || "";
      const page = searchParams.get("page") || "1";

      const { data } = await axios.get(`${BACKEND_URL}/training/all`, {
        withCredentials: true,
        params: { query, page },
      });

      return data;
    },
    queryKey: ["all-trainings"],
  });

  return { allTrainings, isLoading };
}

export function useTrainerTrainings(trainerId: string) {
  const [searchParams] = useSearchParams();

  const { data: trainerTrainings, isLoading } = useQuery({
    queryFn: async () => {
      const page = searchParams.get("page") || "1";
      const { data } = await axios.get(
        `${BACKEND_URL}/training/trainer/${trainerId}`,
        {
          withCredentials: true,
          params: { page },
        }
      );

      return data;
    },
    queryKey: ["trainer-trainings", trainerId],
  });

  return { trainerTrainings, isLoading };
}

export function useTraining(trainingId: string) {
  const { data: training, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `${BACKEND_URL}/training/${trainingId}`,
        {
          withCredentials: true,
        }
      );

      return data;
    },
    queryKey: ["training", trainingId],
  });

  return { training, isLoading };
}
