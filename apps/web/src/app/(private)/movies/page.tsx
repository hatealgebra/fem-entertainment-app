"use client";

import Section from "@repo/ui/components/sections/Section.tsx";
import GalleryWrapper from "../../../components/GalleryWrapper";
import { possibleGenres } from "../../../helpers/client/filterParams.helper";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";

interface SelectGenresProps {
  selectValue: string | null;
  setSelectValue: Dispatch<SetStateAction<string | null>>;
  className?: string;
}

const SelectGenres = ({
  selectValue,
  setSelectValue,
  className,
}: SelectGenresProps) => {
  const [open, setOpen] = useState(false);
  const genres = possibleGenres;

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const choseOption = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.target as HTMLButtonElement;

    if (!value) {
      return;
    }
    setOpen(false);
    setSelectValue(value);
  };

  return (
    <div
      className={`relative bg-black text-white min-width-[250px] max-w-36 min-h-8 z-20 ${className || ""}`}
    >
      <div className="absolute w-36  border-white border-solid border-2 py-1 bg-black">
        <button
          onClick={toggleOpen}
          className="font-semibold pl-2 w-full text-left"
        >
          {selectValue || "Genres"}
        </button>
        <ul
          className={`${open ? "block" : "hidden"} flex flex-col py-2 w-full cursor-pointer`}
          id=""
        >
          {genres.map((genre, index) => (
            <li
              className="hover:text-blue text-sm pl-2 py-1 border-thin w-full"
              key={index + genre}
              value={genre}
            >
              <button
                onClick={choseOption}
                value={genre}
                className="w-full text-left"
              >
                {genre}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Page = () => {
  const [selectValue, setSelectValue] = useState<string | null>(null);
  return (
    <div>
      <Section
        headingText="Movies"
        NextRightElement={() => (
          <SelectGenres
            className="row-span-1"
            selectValue={selectValue}
            setSelectValue={setSelectValue}
          />
        )}
      >
        <GalleryWrapper
          queryParams={selectValue ? `genre=${selectValue}` : ""}
        />
      </Section>
    </div>
  );
};

export default Page;
