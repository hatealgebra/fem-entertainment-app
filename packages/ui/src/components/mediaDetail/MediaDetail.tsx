import Image from "next/image";
import { MdClose } from "react-icons/md";
import { IMediaDetailUI } from "@repo/misc/types/components.js";
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  ForwardedRef,
  RefObject,
} from "react";
import { getImdbImage } from "../../helpers/image.helpers";
import { getScreenTime, getYearFromUTC } from "@repo/misc/utils/date.utils.ts";
import useWindowSize from "../../hooks/useWindowSize";
import { roundTwoDecimals } from "@repo/misc/utils/math.utils.ts";
import useSWR, { BareFetcher, SWRConfiguration } from "swr";

interface MediaDetailProps extends Omit<IMediaDetailUI, "isTrending"> {
  isOpen: boolean;
  closeDialog: (ref: RefObject<HTMLDialogElement>) => void;
}
const fetcher = (url: string) =>
  fetch(url, { method: "POST" }).then((r) => r.json());

const MediaDetail = forwardRef(
  (
    {
      title,
      id: imdbId,
      backdropPath,
      posterPath,
      genres,
      spokenLanguages,
      productionCompanies,
      productionCountries,
      voteAverage,
      overview,
      runtime,
      isTouch,
      isBookmarked = false,
      releaseDate,
      isOpen,
      closeDialog,
    }: MediaDetailProps,
    parentRef: ForwardedRef<HTMLDivElement>
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [fullscreen, setFullscreen] = useState(false);
    const [creditData, setCreditData] = useState({ cast: [], crew: [] });
    const { width: windowWidth } = useWindowSize();
    const fetchCreditUrl = `/api/media/${imdbId}/credit/`;

    const { isLoading } = useSWR(fetchCreditUrl, fetcher, {
      onSuccess: (dataResponse) => setCreditData(dataResponse),
    });
    const closeDialogHandler = () => {
      dialogRef.current?.close();
      setFullscreen(false);
      closeDialog(dialogRef);
    };

    useEffect(() => {
      if (!isOpen) {
        return;
      }

      dialogRef.current?.showModal();

      setTimeout(() => {
        setFullscreen(true);
      }, 500);
    }, [isOpen]);

    if (!parentRef) {
      return null;
    }

    const clientRect = (
      parentRef as React.MutableRefObject<HTMLDivElement>
    ).current?.getBoundingClientRect();

    const stylesConfig = fullscreen
      ? {
          width: "90vw",
          height: "90vh",
          aspectRatio: "16/9",
          left: "50%",
          top: "50%",
        }
      : {
          top: `${clientRect?.top || 0}px`,
          left: `${clientRect?.left || 0}px`,
          width: `${clientRect?.width || 0}px`,
          height: `${clientRect?.height || 0}px`,
        };

    return (
      <dialog
        className={`z-50 ${fullscreen && "backdrop:backdrop-blur-md"}`}
        ref={dialogRef}
        onClick={(e) =>
          (e.target as HTMLElement).nodeName === "DIALOG" &&
          closeDialogHandler()
        }
      >
        <div
          className={`fixed rounded-lg translate-x-[-50%] translate-y-[-50%] overflow-y-hidden transition-all duration-700 bg-opacity-0 overflow-hidden  bg-darkBlue text-white max-w-[560px] max-h-[800px] mx-auto ${fullscreen && "bg-opacity-100 m-auto shadow-sm shadow-[black] overflow-y-scroll"}`}
          style={stylesConfig}
        >
          <div
            className={`relative w-full ${fullscreen && "h-[40%] max-h-[400px]"}`}
          >
            <Image
              src={getImdbImage(backdropPath)}
              alt={`${title} thumbnail`}
              fill
              objectFit={fullscreen ? "cover" : "contain"}
            />
          </div>
          <div
            className={`
               grid grid-cols-[auto_1fr] auto-rows-min items-center gap-x-5 px-[5%] pt-8 pb-10 delay-300 duration-300 opacity-0 
              ${!fullscreen && "opacity-0"} 
             ${fullscreen && "opacity-100"}
              `}
          >
            <button
              className="bg-white text-black p-2 rounded-full absolute top-5 right-5 z-20"
              onClick={closeDialogHandler}
            >
              <MdClose />
            </button>
            {windowWidth > 450 && (
              <Image
                src={getImdbImage(posterPath)}
                alt={`${title} poster`}
                height={200}
                width={100}
              />
            )}
            <div className="flex flex-col items-center col-span-2 md:col-span-[initial] col-start-2 row-start-1">
              <h1 className="row-start-1 font-black text-5xl text-center">
                {title}
              </h1>
              <ul className="text-xs mx-auto pt-2 flex gap-2">
                {genres.split(",").map((genre) => (
                  <li
                    className="bg-blue bg-opacity-90 px-4 py-1 rounded-full"
                    key={genre}
                  >
                    {genre}
                  </li>
                ))}
              </ul>
              <ul className="flex text-center  gap-10 pt-5">
                <li className="flex flex-col gap-y-1">
                  <span className="font-bold text-lg">
                    {getYearFromUTC(releaseDate)}
                  </span>
                  <span className="text-xs text-white text-opacity-80">
                    year
                  </span>
                </li>
                <li className="flex flex-col gap-y-1">
                  <span className="font-bold text-lg">
                    {roundTwoDecimals(voteAverage)}
                  </span>
                  <span className="text-xs text-white text-opacity-80">
                    IMDB
                  </span>
                </li>
                <li className="flex flex-col gap-y-1">
                  <span className="font-bold text-lg">
                    {getScreenTime(runtime)}
                  </span>
                  <span className="text-xs text-white text-opacity-80">
                    time
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-span-2 py-5">
              <p className="mt-3">{overview}</p>
            </div>
          </div>
          <div className="overflow-x-auto  relative">
            <h2 className="font-medium pl-[5%]">Cast</h2>
            <div className="flex gap-x-2 overflow-x-scroll py-3 px-[5%] remove-scrollbar snap-center">
              {!isLoading &&
                creditData?.cast?.length &&
                creditData.cast.map((actor) => {
                  return (
                    <div className="flex-none text-center" key={actor.id}>
                      <Image
                        className="!relative h-[200px] object-cover brightness-90"
                        src={getImdbImage(actor.profile_path)}
                        alt={actor.name}
                        width={200}
                        height={300}
                      />
                      <p className="text-md pt-2">{actor.name}</p>
                      <p className="text-sm text-[gainsboro]">
                        "{actor.character}"
                      </p>
                    </div>
                  );
                })}
            </div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </dialog>
    );
  }
);

export default MediaDetail;
