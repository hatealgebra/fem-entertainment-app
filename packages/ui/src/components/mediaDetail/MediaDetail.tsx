import { IMediaDetailUI } from "@repo/misc/types/components.js";
import Image from "next/image";
import { Ref, forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import movieIcon from "@icons/assets/icons/icon-category-movie.svg";
import tvIcon from "@icons/assets/icons/icon-category-tv.svg";
import { MdClose } from "react-icons/md";
import { transform } from "next/dist/build/swc";

interface MediaDetailProps extends Omit<IMediaDetailUI, "isTrending"> {
  isOpen: boolean;
  closeDialog: (ref: Ref<HTMLDialogElement>) => void;
}

const MediaDetail = forwardRef(
  (
    {
      _id: movieId,
      thumbnail,
      title,
      year,
      category,
      isTouch,
      rating,
      isBookmarked = false,
      handleBookmark,
      isOpen,
      closeDialog,
    }: MediaDetailProps,
    parentRef
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [fullscreen, setFullscreen] = useState(false);

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

    const clientRect = parentRef.current?.getBoundingClientRect();
    const stylesConfig = fullscreen
      ? {
          width: "90vw",
          height: "90vh",
          aspectRatio: "16/9",
          left: "50%",
          top: "50%",
        }
      : {
          top: `${clientRect.top}px`,
          left: `${clientRect.left}px`,
          width: `${clientRect.width}px`,
          height: `${clientRect.height}px`,
        };

    return createPortal(
      <dialog
        className={`z-50 ${fullscreen && "backdrop:backdrop-blur-md"}`}
        ref={dialogRef}
        onClick={(e) => e.target.nodeName === "DIALOG" && closeDialogHandler()}
      >
        <div
          className={`fixed rounded-lg translate-x-[-50%] translate-y-[-50%] overflow-y-scroll transition-all duration-700 bg-opacity-0 overflow-hidden  bg-darkBlue text-white max-w-[560px] max-h-[800px] mx-auto ${fullscreen && "bg-opacity-100 m-auto shadow-sm shadow-[black]"}`}
          style={stylesConfig}
        >
          <div
            className={`relative w-full ${fullscreen && "h-[40%] max-h-[400px]"}`}
          >
            <Image
              src={thumbnail?.regular?.large || thumbnail?.regular?.small}
              alt={`${title} thumbnail`}
              fill
              objectFit={fullscreen ? "cover" : "contain"}
            />
          </div>
          <div
            className={`px-[5%] pt-2 pb-10 delay-700 duration-300 ${!fullscreen && "opacity-0"} ${fullscreen && "opacity-100"}`}
          >
            <button
              className="bg-white text-black p-2 rounded-full absolute top-5 right-5 z-20"
              onClick={closeDialogHandler}
            >
              <MdClose />
            </button>
            <h1>{title}</h1>
            <ul className="flex items-center gap-5 px-2">
              <li>{year}</li>
              <li className="flex items-center gap-2">
                <Image
                  className="w-3 aspect-square h-fit"
                  src={category === "Movie" ? movieIcon : tvIcon}
                  alt={`${category} icon`}
                />
                <span>{category}</span>
              </li>
              <li>{rating}</li>
            </ul>
            <h2 className="mt-10 underline">Description</h2>
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              natus eligendi ea, tempore esse molestias aspernatur atque,
              dolorum possimus debitis maiores? Eum, est pariatur eveniet
              corrupti nulla aspernatur voluptatibus doloribus.
            </p>
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              natus eligendi ea, tempore esse molestias aspernatur atque,
              dolorum possimus debitis maiores? Eum, est pariatur eveniet
              corrupti nulla aspernatur voluptatibus doloribus.
            </p>
          </div>
        </div>
      </dialog>,
      document.body
    );
  }
);

export default MediaDetail;
