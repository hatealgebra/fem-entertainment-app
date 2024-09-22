import Image from "next/image";
import logo from "@icons/assets/icons/logo.svg";

import Link from "next/link";

import avatarPng from "@icons/assets/image-avatar.png";
import IconLinks from "./IconLinks";
import { NAV_PATHS } from "@repo/misc/constants";

const Navigation = () => {
  return (
    <nav className="bg-darkBlue px-4 py-[18px] max-h-[1000px] flex justify-between items-center md:rounded-[10px] md:mt-6 md:mx-6 xl:flex-col xl:h-[95vh] xl:pt-[35px] xl:pb-8 xl:justify-start xl:gap-[75px] xl:mt-0 xl:sticky xl:top-0">
      <Link href={NAV_PATHS}>
        <Image
          className="w-[25px] xl:w-8"
          src={logo}
          alt="Entertainment app logo"
        />
      </Link>
      <IconLinks />
      <Image
        className="relative w-6 aspect-square border-[1px] border-white rounded-full xl:w-10"
        src={avatarPng}
        alt="Avatar user icon"
      />
    </nav>
  );
};

export default Navigation;
