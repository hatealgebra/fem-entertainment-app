"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import iconNavHome from "@icons/assets/icons/icon-nav-home.svg";
import iconNavMovies from "@icons/assets/icons/icon-nav-movies.svg";
import iconNavBookmark from "@icons/assets/icons/icon-nav-bookmark.svg";
import { NAV_PATHS } from "@repo/misc/constants";

const navigationIcons: Record<keyof typeof NAV_PATHS, string> = {
  HOME: iconNavHome,
  MOVIES: iconNavMovies,
  BOOKMARKED: iconNavBookmark,
};

const IconLinks = () => {
  const pathName = usePathname();
  return (
    <ul className="inline-flex gap-x-6 items-center xl:flex-col xl:w-10 xl:flex-grow xl:gap-10">
      {Object.entries(NAV_PATHS).map(([key, value]) => (
        <li key={`${key}-nav-link`}>
          <Link href={value}>
            <Image
              className={`w-4 aspect-square xl:w-5 
              ${pathName === value ? "brightness-0 invert" : "hover:brightness-0 hover:invert"}`}
              src={navigationIcons[key as keyof typeof navigationIcons]}
              alt={`Icon for ${key} navigation link`}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default IconLinks;
