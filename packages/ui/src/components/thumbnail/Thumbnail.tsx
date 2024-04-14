"use client";

import { useState } from "react";
import Image from "next/image";
import { IMovie } from "@repo/misc/types/movies.d.ts";

import bookmarkEmpty from "@icons/assets/icons/icon-bookmark-empty.svg";
import bookmarkFull from "@icons/assets/icons/icon-bookmark-full.svg";
import bookmarkHoverIcon from "@icons/assets/icons/icon-bookmark-hover.svg";
import playIcon from "@icons/assets/icons/icon-play.svg";
import movieIcon from "@icons/assets/icons/icon-category-movie.svg";
import tvIcon from "@icons/assets/icons/icon-category-tv.svg";

interface ThumbnailProps extends IMovie {
  isTouch?: boolean;
}

const Thumbnail = ({
  thumbnail,
  isTrending,
  title,
  year,
  category,
  isTouch,
  rating,
  isBookmarked,
}: ThumbnailProps) => {
  const [bookmarkHover, setBookMarkHover] = useState(false);
  const [hover, setHover] = useState(true);
  const imageParentFolder = isTrending ? "trending" : "regular";

  console.log("hover", hover);
  return (
    <div
      onMouseEnter={() => !isTouch && setHover(true)}
      onMouseLeave={() => !isTouch && setHover(true)}
      className={`relative rounded-lg  overflow-hidden flex flex-col ${isTrending ? "w-[240px] h-[140px] md:w-[470px] md:h-[230px]" : "w-[164px] h-[110px] md:w-[280px] md:h-[226px]"}`}
    >
      <Image
        className={`peer object-cover transition duration-300 ease-in-out hover:brightness-[0.8] hover:cursor-pointer`}
        src={
          thumbnail?.[imageParentFolder]?.large ||
          thumbnail?.[imageParentFolder]?.small
        }
        fill={true}
      />
      {!isTouch && hover && (
        <button className="opacity-100 absolute inset-0 m-auto inline-flex gap-x-[19px] rounded-full bg-[rgba(255,255,255,.5)] pl-[9px] pr-8 py-[9px] w-fit h-fit peer-hover:opacity-100">
          <Image
            className="w-[30px] aspect-square"
            src={playIcon}
            alt="Play thumbnail icon"
          />
          <span className="text-xl text-white">Play</span>
        </button>
      )}
      <button
        className="absolute right-2 top-2 group w-8 aspect-square bg-[#979797] rounded-full flex justify-center items-center hover:bg-[white]"
        onMouseEnter={() => !isBookmarked && setBookMarkHover(true)}
        onMouseLeave={() => setBookMarkHover(false)}
      >
        {isBookmarked ? (
          <Image src={bookmarkFull} alt="Bookmark icon full" />
        ) : (
          <Image
            src={bookmarkHover ? bookmarkHoverIcon : bookmarkEmpty}
            alt="Bookmark icon"
          />
        )}
      </button>
      <div
        className={`flex flex-col ${isTrending && "absolute bottom-4 left-4"}`}
      >
        <div className="flex items-center gap-x-1.5 text-white text-opacity-75">
          <span className="text-sm">{year}</span>
          <Image
            className="w-3 aspect-square"
            src={category === "Movie" ? movieIcon : tvIcon}
            alt={`${category} icon`}
          />
          <span className="text-sm">{category}</span>
          <span className="text-sm uppercase">{rating}</span>
        </div>
        <span className="text-capitalize text-base font-medium">{title}</span>
      </div>
    </div>
  );
};

export default Thumbnail;
