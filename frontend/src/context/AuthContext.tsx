import Loader from "@/components/Loader";
import { BACKEND_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext } from "react";

const authContext = createContext({
  user: {
    _id: "",
    avatar: "",
    name: "",
    email: "",
    contact: null,
  },
  isLoading: false,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: user, isLoading } = useQuery({
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

  return (
    <authContext.Provider value={{ user, isLoading }}>
      {isLoading ? (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
          <Loader />
          <h3 className="h3-bold">Loading Page...</h3>
        </div>
      ) : (
        children
      )}
    </authContext.Provider>
  );
};

export const useAuthContext = () => useContext(authContext);
