import AdminNavItems from "./AdminNavItems";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const AdminMobileNav = () => {
  return (
    <nav className="sm:hidden">
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
