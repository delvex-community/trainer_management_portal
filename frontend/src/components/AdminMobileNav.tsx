import AdminNavItems from "./AdminNavItems";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const AdminMobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <img src="/icons/menu.svg" alt="menu-icon" />
        </SheetTrigger>
        <SheetContent>
          <AdminNavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default AdminMobileNav;
