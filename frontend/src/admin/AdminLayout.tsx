import AdminNavbar from "@/components/AdminNavbar";
import { AdminContextProvider } from "@/context/AdminContext";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <AdminContextProvider>
        <AdminNavbar />
        <main className="container">
          <Outlet />
        </main>
      </AdminContextProvider>
    </div>
  );
};

export default AdminLayout;
