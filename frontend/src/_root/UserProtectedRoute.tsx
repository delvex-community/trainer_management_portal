import Loader from "@/components/Loader";
import { useCurrentUser } from "@/react-query/user";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user, loadingUser } = useCurrentUser();

  useEffect(
    function () {
      if (!loadingUser && !user) {
        navigate("/sign-in");
      }
    },
    [user, loadingUser]
  );

  if (loadingUser) return <Loader />;

  if (user) return children;
};

export default UserProtectedRoute;
