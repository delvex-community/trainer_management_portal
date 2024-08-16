import Navbar from "@/components/Navbar";
import { AuthContextProvider } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <main className="container mt-24 overflow-auto h-full">
          <Outlet />
        </main>
      </AuthContextProvider>
    </div>
  );
};

export default RootLayout;
