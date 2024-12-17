"use client";

import Image from "next/image";
import PlayButton from "../button/PlayButton";
import useWindowSize from "../../hooks/useWindowSize";
import { ReactNode, RefObject, useRef, useState } from "react";
import { IMovie } from "@repo/misc/types/movies.js";
import { getImdbImage } from "../../helpers/image.helpers";
import MediaDetail from "../mediaDetail/MediaDetail";

const TrendingCardWrapper = ({
  children,
  windowWidth,
}: {
  children: ReactNode;
  windowWidth: boolean;
}) => (
  <div className="relative min-w-full rounded-[20px] overflow-hidden shadow-2xl shadow-darkShadow  max-w-[1000px] aspect-[.7] xs:aspect-[1.1] sm:aspect-[1.4] sm:max-h-[450px] md:max-h-[500px]">
    {windowWidth && children}
  </div>
);

interface TrendingCardProps extends IMovie {}

const TrendingCard = ({
  title,
  genres,
  backdropPath,
  tagline,
  ...props
}: TrendingCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inDetail, setInDetail] = useState(false);
  const { width: windowWidth } = useWindowSize();

  const closeDetail = (ref: RefObject<HTMLDialogElement>) => {
    if (!ref.current) {
      return;
    }

    ref.current.close();
    setInDetail(false);
  };

  return (
    <TrendingCardWrapper windowWidth={!!windowWidth}>
      <div className="relative z-10 h-full w-full flex  flex-col justify-between p-[2.5%] bg-[linear-gradient(90deg,_rgba(2,0,36,.7)_0%,_rgba(2,0,36,0.4676664086687307)_46%,_rgba(0,212,255,0)_100%)]">
        <span className=" px-4 py-2 bg-mediumBlue font-semibold text-xs rounded-xl w-fit">
          🔥 Now Trending
        </span>
        <div>
          <div className="flex gap-x-2 pt-2">
            {genres.slice(0, 2).map((genre) => (
              <span
                key={`trending${genre}`}
                className="min-w-20 text-center px-4 py-2 bg-mediumBlue font-semibold text-xs rounded-xl"
              >
                {genre}
              </span>
            ))}
          </div>
          <h2 className="w-[70%] pt-2 font-bold overflow-ellipsis text-2xl max-w-[420px] md:text-5xl">
            {title}
          </h2>
          {windowWidth > 500 && (
            <p className="w-[80%] font-medium text-[#EBEBEA]">{tagline}</p>
          )}
          <div className="flex gap-x-3 pt-5">
            <PlayButton
              className="pl-5 pr-6 sm:pl-8 sm:pr-9"
              onClick={() => {}}
              text="Watch"
              isSmall
              themeKey="contrast"
            />
            <PlayButton
              className="pl-5 pr-6 sm:pl-8 sm:pr-9"
              onClick={() => setInDetail(true)}
              text="Trailer"
              isSmall
              themeKey="outline"
            />
          </div>
        </div>
      </div>
      <Image
        className="absolute object-cover object-left-center"
        src={getImdbImage(backdropPath)}
        priority
        fill
        alt={title}
      />
      {inDetail && (
        <MediaDetail
          ref={cardRef}
          isOpen={inDetail}
          closeDialog={closeDetail}
          title={title}
          genres={genres}
          backdropPath={backdropPath}
          tagline={tagline}
          {...props}
        />
      )}
    </TrendingCardWrapper>
  );
};

export default TrendingCard;
