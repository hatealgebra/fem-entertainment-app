"use client";

import SearchInput from "@repo/ui/components/inputs/SearchInput.tsx";
import React from "react";
import { useForm } from "react-hook-form";

const SearchForm = () => {
  const { register, watch } = useForm();
  return (
    <form className="h-fit">
      <SearchInput
        placeholder="Search for movies or TV series"
        textContent={watch("search")}
        {...register("search")}
      />
    </form>
  );
};

export default SearchForm;
