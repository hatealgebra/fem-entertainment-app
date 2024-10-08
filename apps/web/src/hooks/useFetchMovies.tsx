import { createQueryParams } from "../helpers/client/searchParams.helper";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { AppContext } from "../state/AppContext";

const getRequest = async (keyArray: []) => {
  const url = keyArray.join("");
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};

export type TSearchParams = {
  category?: string;
  queryParams?: string;
};

const useFetchMovies = () => {
  const [queryParams, setQueryParams] = useState<string | null>(null);
  const { searchString } = useContext(AppContext);
  const pathName = usePathname();
  const SWRResponse = useSWR(["/api/media", queryParams], getRequest, {
    keepPreviousData: true,
  });

  useEffect(() => {
    const newQueryParams = createQueryParams(pathName, searchString);
    setQueryParams(newQueryParams);
  }, [searchString, pathName]);

  return SWRResponse;
};

export default useFetchMovies;
