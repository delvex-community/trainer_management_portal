import AdminNavbar from "@/components/AdminNavbar";
import { AdminContextProvider } from "@/context/AdminContext";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <AdminContextProvider>
        <AdminNavbar />
        <main className="container mt-24 sm:mt-20 overflow-auto h-full">
          <Outlet />
        </main>
      </AdminContextProvider>
    </div>
  );
};

export default AdminLayout;
