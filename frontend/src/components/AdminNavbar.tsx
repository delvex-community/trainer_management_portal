import { Link } from "react-router-dom";
import AdminNavMenu from "./AdminNavMenu";

const AdminNavbar = () => {
  return (
    <div className="h-fit py-3  shadow-lg">
      <div className="container flex items-center justify-between">
        <Link to="/" className="h2-bold text-primary-500">
          Delvex
        </Link>
        <AdminNavMenu />
      </div>
    </div>
  );
};

export default AdminNavbar;
