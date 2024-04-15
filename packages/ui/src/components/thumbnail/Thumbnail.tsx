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
  isTrending = false,
  title,
  year,
  category,
  isTouch,
  rating,
  isBookmarked = false,
}: ThumbnailProps) => {
  const [bookmarkHover, setBookMarkHover] = useState(false);
  const [hover, setHover] = useState(false);
  const imageParentFolder = isTrending ? "trending" : "regular";

  return (
    <div
      onMouseEnter={() => !isTouch && setHover(true)}
      onMouseLeave={() => !isTouch && setHover(false)}
      className="relative w-full sm:max-w-auto h-fit sm:w-fit"
    >
      <div
        className={`peer relative overflow-hidden transition duration-300 ease-in-out rounded-lg ${isTrending ? " w-[240px] h-[140px] md:w-[470px] md:h-[230px]" : "w-[100%] h-[110px] sm:w-[164px] md:w-[220px] md:h-[140px] lg:w-[280px] lg:h-[226px]"}`}
      >
        <Image
          className="object-cover w-full h-full hover:brightness-[0.8] hover:cursor-pointer"
          src={
            thumbnail?.[imageParentFolder]?.large ||
            thumbnail?.[imageParentFolder]?.small
          }
          alt={`${title} thumbnail`}
          fill
          sizes={
            isTrending
              ? "(min-width: 768px) 470px, 240px"
              : "(min-width: 480px),(min-width: 768px) 220px, (min-width:1440px), 100%"
          }
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
      </div>
      <div
        className={`flex flex-col ${isTrending ? "absolute bottom-4 left-4" : "mt-2"}`}
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
