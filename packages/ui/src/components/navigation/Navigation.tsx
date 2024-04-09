import Image from "next/image";
import logo from "@icons/assets/icons/logo.svg";
import { NAV_PATHS } from "@repo/misc/constants";
import Link from "next/link";

import iconNavHome from "@icons/assets/icons/icon-nav-home.svg";
import iconNavMovies from "@icons/assets/icons/icon-nav-movies.svg";
import iconNavTv from "@icons/assets/icons/icon-nav-tv-series.svg";
import iconNavBookmark from "@icons/assets/icons/icon-nav-bookmark.svg";

import avatarPng from "../../assets/image-avatar.png";

const navigationIcons = {
  home: iconNavHome,
  movies: iconNavMovies,
  tv_series: iconNavTv,
  bookmarked: iconNavBookmark,
};

const Navigation = () => {
  return (
    <nav className="bg-darkBlue px-4 py-[18px] flex justify-between items-center md:m-auto md:mx-[2.5%] md:mt-6 lg:flex-col lg:h-full">
      <Image className="w-[25px]" src={logo} alt="Entertainment app logo" />
      <ul className="inline-flex gap-x-6 items-center lg:flex-col">
        {Object.entries(NAV_PATHS).map(([key, value]) => (
          <li key={`${key}-nav-link`}>
            <Link href={value}>
              <Image
                className="w-4 aspect-square"
                src={navigationIcons[key as keyof typeof navigationIcons]}
                alt={`Icon for ${key} navigation link`}
              />
            </Link>
          </li>
        ))}
      </ul>
      <Image
        className="relative w-6 aspect-square border-[1px] border-white rounded-full"
        src={avatarPng}
        alt="Avatar user icon"
      />
    </nav>
  );
};

export default Navigation;
