import { IMovie } from "@repo/misc/types/movies.js";
import { RefObject, useRef, useState } from "react";
import { getImdbImage } from "../../helpers/image.helpers";
import Image from "next/image";
import MediaDetail from "../mediaDetail/MediaDetail";

interface ThumbnailPosterProps extends IMovie {
  posterSize: {
    width: number;
    height: number;
  };
}

const ThumbnailPoster = ({ posterSize, ...props }: ThumbnailPosterProps) => {
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
    <>
      <button className="apperance-none" onClick={openDetail}>
        <Image
          src={getImdbImage(props.posterPath)}
          sizes={`${posterSize.width}px`}
          alt={`${props.originalTitle} poster path`}
          width={posterSize.width}
          height={posterSize.height}
        />
      </button>
      <MediaDetail
        ref={cardRef}
        isOpen={inDetail}
        closeDialog={closeDetail}
        {...props}
      />
    </>
  );
};

export default ThumbnailPoster;
