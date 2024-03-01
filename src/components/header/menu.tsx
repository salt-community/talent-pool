import { Link, NavbarMenu, NavbarMenuToggle } from "@nextui-org/react";

export const Menu = () => {
  return (
    <>
      <NavbarMenuToggle />
      <NavbarMenu className="z-100 flex flex-col items-center gap-4 pt-10">
        <Link href="#">Sign Out</Link>
      </NavbarMenu>
    </>
  );
};