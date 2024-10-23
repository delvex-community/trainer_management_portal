import { Link } from "react-router-dom";
import UserNav from "./UserNav";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <div className="fixed top-0 z-20 bg-white w-full h-fit py-3 shadow-md">
      <div className="container flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-[700] text-[#027efe] flex items-center gap-3"
        >
          <img src="/images/delvex-logo.png" alt="" className="h-8 w-8" />
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
