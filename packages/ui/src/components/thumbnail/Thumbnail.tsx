"use client";

import Image, { StaticImageData } from "next/image";
import bookmarkEmpty from "@icons/assets/icons/icon-bookmark-empty.svg";
import bookmarkFull from "@icons/assets/icons/icon-bookmark-full.svg";
import bookmarkHover from "@icons/assets/icons/icon-bookmark-hover.svg";
import playIcon from "@icons/assets/icons/icon-play.svg";
import { useState } from "react";

//TODO: Addd alt

const bookmarkState = {
  EMPTY: bookmarkEmpty,
  FULL: bookmarkFull,
};

interface ThumbnailProps {
  staticImage: StaticImageData;
  state: keyof typeof bookmarkState;
  isWide?: boolean;
  isTouch?: boolean;
}

const Thumbnail = ({
  staticImage,
  state = "EMPTY",
  isWide,
  isTouch,
}: ThumbnailProps) => {
  const [hover, setHover] = useState(false);
  return (
    <div className="relative w-fit flex">
      <Image
        className="peer rounded-lg object-contain transition duration-300 ease-in-out hover:brightness-[0.8] hover:cursor-pointer"
        src={staticImage}
        width={isWide ? 240 : 164}
        height={isWide ? 140 : 110}
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
        onMouseEnter={() => state === "EMPTY" && setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image
          src={hover ? bookmarkHover : bookmarkState[state]}
          alt="Bookmark icon"
        />
      </button>
    </div>
  );
};

export default Thumbnail;
