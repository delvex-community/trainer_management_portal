import { BACKEND_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCurrentUser() {
  const { data: user, isLoading: loadingUser } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/user`, {
          withCredentials: true,
        });

        return data;
      } catch (error) {
        return null;
      }
    },
    queryKey: ["user"],
    retry: false,
  });

  return { user, loadingUser };
}
