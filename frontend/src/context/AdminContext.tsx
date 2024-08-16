import Loader from "@/components/Loader";
import { BACKEND_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext } from "react";

const adminContext = createContext({
  admin: {
    _id: "",
    email: "",
  },
  isLoading: false,
});

export const AdminContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: admin, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/admin`, {
          withCredentials: true,
        });

        return data;
      } catch (error) {
        return null;
      }
    },
    queryKey: ["admin"],
    retry: false,
  });

  return (
    <adminContext.Provider value={{ admin, isLoading }}>
      {isLoading ? (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
          <Loader />
          <h3 className="h3-bold">Loading Page...</h3>
        </div>
      ) : (
        children
      )}
    </adminContext.Provider>
  );
};

export const useAdminContext = () => useContext(adminContext);
