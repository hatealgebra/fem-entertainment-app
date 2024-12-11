"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import { AppContext } from "../state/AppContext";
import SearchGallery from "@repo/ui/components/galleries/SearchGallery.tsx";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

interface IPageContext {
  children: ReactNode;
}

const PageContent = ({ children }: IPageContext) => {
  const { searchString } = useContext(AppContext);
  const [debounce, setDebounce] = useState(false);
  const {
    data: movieData,
    trigger,
    isMutating,
  } = useSWRMutation(`/api/media/search?queryString=${searchString}`, (url) =>
    fetch(url).then((res) => res.json())
  );
  useEffect(() => {
    console.log(searchString?.length);
    if (!searchString || debounce) {
      return;
    }
    setDebounce(true);
    trigger();
    setTimeout(() => {
      setDebounce(false);
    }, 400);
  }, [searchString]);

  return (
    <>
      {!searchString && children}
      {searchString && (
        <SearchGallery
          isLoading={isMutating || debounce}
          searchString={searchString}
          searchResults={movieData?.data}
        />
      )}
    </>
  );
};

export default PageContent;
