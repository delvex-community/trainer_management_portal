import Loader from "@/components/Loader";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectedRoute = ({ children }: { children: React.ReactNode }) => {
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
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isLoading && !user) {
        navigate("/sign-in");
        toast({
          title: "Unauthorized Access",
          description: "You need login to access it.",
          variant: "destructive",
        });
      }
    },
    [user, isLoading]
  );

  if (isLoading) return <Loader />;

  if (user) return children;
};

export default UserProtectedRoute;
