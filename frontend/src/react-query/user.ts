import { BACKEND_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

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

export function useAllUsers() {
  const [searchParams] = useSearchParams();

  const { data: allUsers, isLoading: loadingUsers } = useQuery({
    queryFn: async () => {
      try {
        const query = searchParams.get("query") || "";
        const sort = searchParams.get("sort") || "";
        const order = searchParams.get("order") || "";
        const page = searchParams.get("page") || "1";

        const { data } = await axios.get(`${BACKEND_URL}/user/all`, {
          params: {
            query,
            sort,
            order,
            page,
          },
          withCredentials: true,
        });

        return data;
      } catch (error) {
        return null;
      }
    },
    queryKey: ["all-users"],
    retry: false,
  });

  return { allUsers, loadingUsers };
}

export function useUserById(userId: string) {
  const { data: user, isLoading: loadingUser } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/user/${userId}`, {
          withCredentials: true,
        });

        return data;
      } catch (error) {
        return null;
      }
    },
    queryKey: ["user", userId],
    retry: false,
  });

  return { user, loadingUser };
}
