import Image from "next/image";
import { Ref, forwardRef } from "react";
import searchIcon from "@icons/assets/icons/icon-search.svg";
import { InputProps } from "./input";

// TODO: Add custom cursor
const SearchInput = forwardRef(
  ({ textContent, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
    return (
      <div className="flex gap-x-6">
        <button>
          <Image src={searchIcon} alt="Search movies icon" />
        </button>
        <div className="relative flex w-full flex-col mr-[5%]">
          <input
            className={`peer focus:text-opacity-100 ${textContent && "text-opacity-100"}`}
            type="text"
            ref={ref}
            autoComplete="off"
            {...props}
          />
          <div className="peer-focus:border-b-blue border-b-[1px] w-full border-[transparent]" />
        </div>
      </div>
    );
  }
);

export default SearchInput;
