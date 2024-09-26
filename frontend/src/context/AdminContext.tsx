import { BACKEND_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
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
        <div className="h-screen w-full flex items-center justify-center">
          <Loader className="animate-spin h-8 w-8" />
        </div>
      ) : (
        children
      )}
    </adminContext.Provider>
  );
};

export const useAdminContext = () => useContext(adminContext);
