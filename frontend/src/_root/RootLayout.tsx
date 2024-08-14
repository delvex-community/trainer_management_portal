import Navbar from "@/components/Navbar";
import { AuthContextProvider } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <main className="container">
          <Outlet />
        </main>
      </AuthContextProvider>
    </div>
  );
};

export default RootLayout;
