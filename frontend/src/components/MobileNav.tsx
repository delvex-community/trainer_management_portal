import NavItems from "./NavItems";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const MobileNav = () => {
  return (
    <nav className="sm:hidden">
      <Sheet>
        <SheetTrigger>
          <img src="/icons/menu.svg" alt="menu-icon" />
        </SheetTrigger>
        <SheetContent>
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
