"use client";

import { useState } from "react";
import Image from "next/image";
import { IMovie } from "@repo/misc/types/movies.d.ts";

import playIcon from "@icons/assets/icons/icon-play.svg";
import movieIcon from "@icons/assets/icons/icon-category-movie.svg";
import tvIcon from "@icons/assets/icons/icon-category-tv.svg";
import BookmarkIcon from "../icons/BookmarkIcon";

interface ThumbnailProps extends IMovie {
  _id: string;
  isTouch?: boolean;
  isBookmarked?: boolean;
  handleBookmark: (movieId: string, isBookmarked: boolean) => Promise<void>;
}

const Thumbnail = ({
  _id: movieId,
  thumbnail,
  isTrending = false,
  title,
  year,
  category,
  isTouch,
  rating,
  isBookmarked = false,
  handleBookmark,
}: ThumbnailProps) => {
  const [hover, setHover] = useState(false);
  const imageParentFolder = isTrending ? "trending" : "regular";

  return (
    <div
      onMouseEnter={() => !isTouch && setHover(true)}
      onMouseLeave={() => !isTouch && setHover(false)}
      className="group relative w-full sm:max-w-auto grow h-fit sm:w-fit sm:max-w-fit"
    >
      <div
        className={`peer relative w-full overflow-hidden transition duration-300 ease-in-out rounded-lg aspect-[1.7073170731707317]  ${isTrending ? "w-[240px] h-[140px] md:w-[470px] md:h-[230px]" : "w-full h-auto sm:w-[164px] md:w-[220px] md:h-[140px] lg:w-[280px] lg:h-[226px]"}`}
      >
        <Image
          className="object-cover w-full h-full group-hover:brightness-[0.8] hover:cursor-pointer aspect-[1.7073170731707317] "
          src={
            thumbnail?.[imageParentFolder]?.large ||
            thumbnail?.[imageParentFolder]?.small
          }
          alt={`${title} thumbnail`}
          fill
          sizes={
            isTrending
              ? "(min-width: 768px) 470px, 240px"
              : "(min0-w),(min-width: 768px) 220px, (min-width:1440px), 100%"
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
          className={`absolute right-2 top-2 group w-8 aspect-square bg-[#979797] rounded-full flex justify-center items-center hover:bg-[white]}`}
          onClick={() => handleBookmark(movieId, isBookmarked)}
        >
          <BookmarkIcon
            className={`${!isBookmarked && "fill-none stroke-white"} ${isBookmarked && "stroke-white fill-white"}`}
          />
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
