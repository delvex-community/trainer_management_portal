import NavItems from "./NavItems";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const MobileNav = () => {
  return (
    <nav className="sm:hidden">
      <Sheet>
        <SheetTrigger>
          <img src="/icons/menu.svg" alt="menu-icon" />
        </SheetTrigger>{" "}
        <SheetHeader>
          <SheetTitle className="hidden">Delvex</SheetTitle>
          <SheetContent className="w-[60%] flex flex-col items-center pt-10">
            <img
              src="/images/delvex-logo.png"
              alt=""
              className="h-8 w-8 mb-4"
            />
            <NavItems />
          </SheetContent>
        </SheetHeader>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
