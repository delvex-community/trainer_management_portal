import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex-center min-h-screen w-full bg-primary-50">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
