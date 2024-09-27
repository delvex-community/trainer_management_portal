import AdminNavItems from "./AdminNavItems";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const AdminMobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <img src="/icons/menu.svg" alt="menu-icon" />
        </SheetTrigger>
        <SheetContent className="w-[60%] flex flex-col items-center pt-10 text-center">
          <h1 className="font-bold text-2xl text-blue-2">Delvex</h1>
          <AdminNavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default AdminMobileNav;
