import Image from "next/image";
import logo from "@icons/assets/icons/logo.svg";
import { NAV_PATHS } from "@repo/misc/constants";
import Link from "next/link";

import iconNavHome from "@icons/assets/icons/icon-nav-home.svg";
import iconNavMovies from "@icons/assets/icons/icon-nav-movies.svg";
import iconNavTv from "@icons/assets/icons/icon-nav-tv-series.svg";
import iconNavBookmark from "@icons/assets/icons/icon-nav-bookmark.svg";

import avatarPng from "@icons/assets/image-avatar.png";

const navigationIcons = {
  home: iconNavHome,
  movies: iconNavMovies,
  tv_series: iconNavTv,
  bookmarked: iconNavBookmark,
};

const Navigation = () => {
  return (
    <nav className="bg-darkBlue px-4 py-[18px] max-h-fit flex justify-between items-center md:rounded-[10px] md:mt-6 md:mx-6 xl:flex-col xl:h-[95vh] xl:pt-[35px] xl:pb-8 xl:justify-start xl:gap-[75px] xl:mt-0">
      <Link href={NAV_PATHS.home}>
        <Image
          className="w-[25px] xl:w-8"
          src={logo}
          alt="Entertainment app logo"
        />
      </Link>
      <ul className="inline-flex gap-x-6 items-center xl:flex-col xl:w-10 xl:flex-grow xl:gap-10">
        {Object.entries(NAV_PATHS).map(([key, value]) => (
          <li key={`${key}-nav-link`}>
            <Link href={value}>
              <Image
                className="w-4 aspect-square xl:w-5"
                src={navigationIcons[key as keyof typeof navigationIcons]}
                alt={`Icon for ${key} navigation link`}
              />
            </Link>
          </li>
        ))}
      </ul>
      <Image
        className="relative w-6 aspect-square border-[1px] border-white rounded-full xl:w-10"
        src={avatarPng}
        alt="Avatar user icon"
      />
    </nav>
  );
};

export default Navigation;
