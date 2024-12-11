"use client";
import Gallery, {
  GalleryProps,
} from "@repo/ui/components/galleries/Gallery.tsx";
import { useContext } from "react";
import { AppContext } from "../state/AppContext";
import { bookmarkMovie } from "../services/client/user.services";
import useFetchUser from "../hooks/useFetchUser";
import useSWR from "swr";

interface GalleryWrapperProps extends Pick<GalleryProps, "headingText"> {
  queryParams: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const GalleryWrapper = ({
  headingText,
  queryParams = "",
}: GalleryWrapperProps) => {
  const queryParamsFinal = queryParams ? `?${queryParams}` : "";

  const {
    data: movies,
    isLoading,
    error,
  } = useSWR(`api/media${queryParamsFinal}`, fetcher);
  const { userData } = useFetchUser();
  const { searchString } = useContext(AppContext);

  return (
    <Gallery
      headingText={headingText}
      searchString={searchString}
      moviesData={movies?.data || []}
      totalLength={movies?.totalLength}
      isLoading={isLoading}
      error={error}
      bookmarkedMovies={userData?.bookmarkedMovies}
      handleBookmark={bookmarkMovie}
    />
  );
};

export default GalleryWrapper;
