"use client";

import {
  DialogHTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  Ref,
  RefObject,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { IMediaDetailUI } from "@repo/misc/types/components.d.ts";

import starIcon from "@icons/assets/icons/star.svg";
import { getScreenTime, getYearFromUTC } from "@repo/misc/utils/date.utils.ts";
import { roundTwoDecimals } from "@repo/misc/utils/math.utils.ts";
import BookmarkIcon from "../icons/BookmarkIcon";
import MediaDetail from "../mediaDetail/MediaDetail";
import { getImdbImage } from "../../helpers/image.helpers";
import { BareFetcher, SWRConfiguration } from "swr";
import PlayButton from "../button/PlayButton";

interface ThumbnailProps extends IMediaDetailUI {
  onClick: () => void;
  hidden?: boolean;
  fetchService?: SWRConfiguration<any, any, BareFetcher<any>>;
}

const ThumbnailCard = ({
  _id: movieId,
  releaseDate,
  // isTrending = false,
  title,
  backdropPath,
  posterPath,
  runtime,
  originalLanguage,
  genres,
  voteAverage,
  isTrending = false,
  isTouch,
  isBookmarked = false,
  handleBookmark,
  onClick,
}: ThumbnailProps) => {
  const [hover, setHover] = useState(false);
  // const imageParentFolder = isTrending ? "trending" : "regular";

  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className="h-full w-full"
      onMouseEnter={() => !isTouch && setHover(true)}
      onMouseLeave={() => !isTouch && setHover(false)}
    >
      <div
        className={`
          peer relative overflow-hidden duration-300 ease-in-out rounded-lg aspect-[2/3] shadow-md shadow-darkShadow
        `}
      >
        <Image
          onClick={handleClick}
          className="object-cover w-full h-full group-hover:brightness-[0.8] hover:cursor-pointer aspect-[2/3]"
          src={getImdbImage(posterPath)}
          alt={`Poster of ${title}`}
          fill
          sizes="350"
        />
        {!isTouch && hover && (
          <div className="absolute peer-hover:opacity-100 h-fit w-fit inset-0 m-auto">
            <PlayButton themeKey="default" onClick={handleClick} text="Play" />
          </div>
        )}
        <button
          className={`absolute right-2 top-2 group w-8 aspect-square bg-[#979797] rounded-full flex justify-center items-center hover:scale-125}`}
          onClick={() => handleBookmark(movieId, isBookmarked)}
        >
          <BookmarkIcon
            className={`${!isBookmarked && "fill-none stroke-white"} ${isBookmarked && "stroke-white fill-white"}`}
          />
        </button>
      </div>
      <div
        onClick={handleClick}
        // className={`flex flex-col ${isTrending ? "absolute bottom-4 left-4" : "mt-2"}`}
      >
        <div className="flex items-center text-sm gap-x-2.5 text-white text-opacity-75 pt-2 max-w-full text-wrap">
          <span>{getYearFromUTC(releaseDate)}</span>
          {/* <Image
            // src={category === "Movie" ? movieIcon : tvIcon}
            src={movieIcon}
            className="w-3 aspect-square"
            // alt={`${category} icon`}
          /> */}
          {/* <span >{category}</span> */}
          <span className="lowercase">{getScreenTime(runtime)}</span>
          <span>{genres?.length && genres[0]}</span>
        </div>
        <span className="text-capitalize text-base font-medium inline-flex gap-1 align-center text-white">
          <Image className="w-4" src={starIcon} alt="Star icon" />
          {roundTwoDecimals(voteAverage)}
        </span>
      </div>
    </div>
  );
};

const Thumbnail = ({
  fetchService,
  ...props
}: Omit<ThumbnailProps, "onClick">) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inDetail, setInDetail] = useState(false);

  const openDetail = () => {
    setInDetail(true);
  };

  const closeDetail = (ref: RefObject<HTMLDialogElement>) => {
    if (!ref.current) {
      return;
    }

    ref.current.close();
    setInDetail(false);
  };

  return (
    <div
      ref={cardRef}
      className={`relative group rounded-lg sm:max-w-auto w-[90%] max-w-[260px] xs:w-full xs:max-w-[40vw] sm:max-w-[initial] sm:w-[25vw] sm:basis-[initial] md:w-[20vw] lg:w-[190px]`}
    >
      <ThumbnailCard {...props} onClick={openDetail} hidden={inDetail} />
      {inDetail && (
        <MediaDetail
          ref={cardRef}
          isOpen={inDetail}
          closeDialog={closeDetail}
          {...props}
        />
      )}
    </div>
  );
};

export default Thumbnail;
