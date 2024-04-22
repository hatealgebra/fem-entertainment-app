"use client";

import SearchInput from "@repo/ui/components/inputs/SearchInput.tsx";
import React, { useContext, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";

import { AppDispatchContext } from "../state/AppContext";
import { EActions } from "../state/appReducer";
import { usePathname } from "next/navigation";

const SearchForm = () => {
  const { register, watch, reset } = useForm();
  const pathname = usePathname();
  const dispatch = useContext(AppDispatchContext);

  const searchMovie = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      dispatch({ type: EActions.SET_SEARCH_STRING, payload: e.target.value });
    }, 400);
  };

  useLayoutEffect(() => {
    dispatch({ type: EActions.SET_SEARCH_STRING, payload: "" });
    reset();
  }, [pathname]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="h-fit">
      <SearchInput
        placeholder="Search for movies or TV series"
        textContent={watch("search")}
        {...register("search", {
          onChange: searchMovie,
        })}
      />
    </form>
  );
};

export default SearchForm;
