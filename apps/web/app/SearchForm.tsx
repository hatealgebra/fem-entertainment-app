"use client";

import SearchInput from "@repo/ui/components/inputs/SearchInput.tsx";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import { AppDispatchContext } from "../src/state/AppContext";
import { EActions } from "../src/state/appReducer";

const SearchForm = () => {
  const { register, watch } = useForm();
  const dispatch = useContext(AppDispatchContext);

  const searchMovie = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: EActions.SET_SEARCH_STRING, payload: e.target.value });
  };

  return (
    <form className="h-fit">
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
