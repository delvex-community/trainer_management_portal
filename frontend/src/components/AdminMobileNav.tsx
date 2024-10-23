import AdminNavItems from "./AdminNavItems";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const AdminMobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <img src="/icons/menu.svg" alt="menu-icon" />
        </SheetTrigger>
        <SheetHeader>
          <SheetTitle className="hidden">Delvex</SheetTitle>
          <SheetContent className="w-[60%] flex flex-col items-center pt-10 text-center">
            <img
              src="/images/delvex-logo.png"
              alt=""
              className="h-8 w-8 mb-4"
            />
            <AdminNavItems />
          </SheetContent>
        </SheetHeader>
      </Sheet>
    </nav>
  );
};

export default AdminMobileNav;
