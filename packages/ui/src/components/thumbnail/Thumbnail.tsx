"use client";

import { useState } from "react";
import Image from "next/image";
import { IMovie } from "@repo/misc/types/movies.d.ts";

import bookmarkEmpty from "@icons/assets/icons/icon-bookmark-empty.svg";
import bookmarkFull from "@icons/assets/icons/icon-bookmark-full.svg";
import bookmarkHover from "@icons/assets/icons/icon-bookmark-hover.svg";
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
  const [hover, setHover] = useState(false);
  return (
    <div className="relative w-fit flex flex-col">
      <Image
        className={`peer ${isTrending ? "w-[240px] h-[140px]" : "w-[164px] h-[110px]"} rounded-lg object-contain transition duration-300 ease-in-out hover:brightness-[0.8] hover:cursor-pointer`}
        src={thumbnail?.trending?.large || thumbnail?.trending?.small}
        width={isTrending ? 240 : 164}
        height={isTrending ? 140 : 110}
      />
      {!isTouch && (
        <button className="opacity-100 absolute inset-0 inline-flex gap-x-[19px] items-center place-self-center rounded-full bg-[rgba(255,255,255,.5)] pl-[9px] pr-8 py-[9px] w-fit h-fit peer-hover:opacity-100">
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
        onMouseEnter={() => !isBookmarked && setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {isBookmarked ? (
          <Image src={bookmarkFull} alt="Bookmark icon full" />
        ) : (
          <Image
            src={hover ? bookmarkHover : bookmarkEmpty}
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
