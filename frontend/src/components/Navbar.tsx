import { Link } from "react-router-dom";
import UserNav from "./UserNav";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <div className="fixed top-0 z-20 bg-white w-full h-fit py-3 shadow-md">
      <div className="container flex items-center justify-between">
        <Link to="/" className="h2-bold text-blue-2">
          Delvex
        </Link>
        <div className="hidden sm:block">
          <NavItems />
        </div>
        <div className="flex items-center gap-4">
          <UserNav />
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
