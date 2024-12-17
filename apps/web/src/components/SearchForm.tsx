"use client";

import SearchInput from "@repo/ui/components/inputs/SearchInput.tsx";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";

import { AppDispatchContext } from "../state/AppContext";
import { EActions } from "../state/appReducer";
import { usePathname } from "next/navigation";

const SearchForm = () => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState,
    formState: { isValidating },
  } = useForm();
  const pathname = usePathname();
  const dispatch = useContext(AppDispatchContext) as React.Dispatch<{
    type: EActions;
    payload: string;
  }>;

  const data = watch();
  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!formState.isValid && isValidating) {
      return;
    }

    if (!data.search) {
      dispatch({ type: EActions.SET_SEARCH_STRING, payload: "" });
    }
    dispatch({ type: EActions.SET_SEARCH_STRING, payload: data.search });
  }, [formState, data, isValidating]);

  useLayoutEffect(() => {
    dispatch({ type: EActions.SET_SEARCH_STRING, payload: "" });
    reset();
  }, [pathname]);

  if (pathname.includes("bookmarked")) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-fit z-0">
      <SearchInput
        placeholder="Search for movies"
        textContent={watch("search")}
        {...register("search", { required: true })}
      />
    </form>
  );
};

export default SearchForm;
