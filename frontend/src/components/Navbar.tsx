import { Link } from "react-router-dom";
import UserNav from "./UserNav";

const Navbar = () => {
  return (
    <div className="h-fit py-3 shadow-md">
      <div className="container flex items-center justify-between">
        <Link to="/" className="h2-bold text-primary-500">
          Delvex
        </Link>
        <UserNav />
      </div>
    </div>
  );
};

export default Navbar;
