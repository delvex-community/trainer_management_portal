import NavItems from "./NavItems";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const MobileNav = () => {
  return (
    <nav className="sm:hidden">
      <Sheet>
        <SheetTrigger>
          <img src="/icons/menu.svg" alt="menu-icon" />
        </SheetTrigger>
        <SheetContent className="w-[60%] flex flex-col items-center pt-10">
          <h1 className="font-bold text-2xl text-blue-2">Delvex</h1>
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
