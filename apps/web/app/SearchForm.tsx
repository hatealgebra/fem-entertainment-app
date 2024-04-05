"use client";
import Image from "next/image";

import searchIcon from "../src/assets/icons/icon-search.svg";
import Input from "@repo/ui/components/input/Input.tsx";
import { useForm } from "react-hook-form";

interface Inputs {
  search: string;
}

const SearchForm = () => {
  const { register, watch, setValue } = useForm<Inputs>();
  console.log(watch("search")?.length);
  return (
    <form>
      <div className="flex gap-x-6">
        <button>
          <Image src={searchIcon} alt="Search movies icon" />
        </button>
        <Input
          placeholder="Search for movies or TV series"
          textContent={watch("search")}
          onKeyDown={(e) => {
            setValue("search", e.currentTarget.value);
          }}
          {...register("search")}
        />
      </div>
    </form>
  );
};

export default SearchForm;
