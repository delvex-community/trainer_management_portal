import Loader from "@/components/Loader";
import { BACKEND_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
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
    queryKey: ["user"],
    retry: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!admin) {
        navigate("/admin-auth");
      }
    }
  }, [admin]);

  if (isLoading) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (admin) return children;
};

export default AdminProtectedRoute;
