import Image from "next/image";
import logo from "@icons/assets/icons/logo.svg";

import Link from "next/link";

import IconLinks from "./IconLinks";
import { NAV_PATHS } from "@repo/misc/constants";
import Avatar from "./Avatar";

const Navigation = () => {
  return (
    <nav className="bg-darkBlue z-20 px-4 py-[18px] max-h-[1000px] flex justify-between items-center md:rounded-[10px] md:mt-6 md:mx-6 xl:flex-col xl:h-[95vh] xl:pt-[35px] xl:pb-8 xl:justify-start xl:gap-[75px] xl:mt-0 xl:sticky xl:top-0">
      <Link href={NAV_PATHS.HOME}>
        <Image
          className="w-[25px] xl:w-8"
          src={logo}
          alt="Entertainment app logo"
        />
      </Link>
      <IconLinks />
      <Avatar />
    </nav>
  );
};

export default Navigation;
