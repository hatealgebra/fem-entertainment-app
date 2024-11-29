"use client";
import Gallery, {
  GalleryProps,
} from "@repo/ui/components/galleries/Gallery.tsx";
import useFetchMovies from "../hooks/useFetchMovies";
import { useContext } from "react";
import { AppContext } from "../state/AppContext";
import { bookmarkMovie } from "../services/client/user.services";
import useFetchUser from "../hooks/useFetchUser";

interface GalleryWrapperProps extends Pick<GalleryProps, "headingText"> {}

const GalleryWrapper = ({ headingText }: GalleryWrapperProps) => {
  const { data: movies, isLoading, error } = useFetchMovies();
  const { userData } = useFetchUser();
  const { searchString } = useContext(AppContext);

  console.log("movies", movies);
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
