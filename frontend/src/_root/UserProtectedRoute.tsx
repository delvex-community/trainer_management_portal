import Loader from "@/components/Loader";
// import { toast } from "@/components/ui/use-toast";
import { useCurrentUser } from "@/react-query/user";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user, loadingUser } = useCurrentUser();

  console.log(user, loadingUser);

  useEffect(
    function () {
      if (!loadingUser && !user) {
        navigate("/sign-in");
        // toast({
        //   title: "Unauthorized Access",
        //   description: "You need login to access it.",
        //   variant: "destructive",
        // });
      }
    },
    [user, loadingUser]
  );

  if (loadingUser) return <Loader />;

  if (user) return children;
};

export default UserProtectedRoute;
