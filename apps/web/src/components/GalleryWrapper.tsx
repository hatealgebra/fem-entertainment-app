"use client";
import Gallery, {
  GalleryProps,
} from "@repo/ui/components/galleries/Gallery.tsx";
import useFetchMovies from "../hooks/useFetchMovies";
import { useContext } from "react";
import { AppContext } from "../state/AppContext";

interface GalleryWrapperProps extends Pick<GalleryProps, "headingText"> {}

const GalleryWrapper = ({ headingText }: GalleryWrapperProps) => {
  const { data: movies, isLoading, error } = useFetchMovies();
  const { searchString } = useContext(AppContext);

  return (
    <Gallery
      headingText={headingText}
      searchString={searchString}
      moviesData={movies?.data || []}
      totalLength={movies?.totalLength}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default GalleryWrapper;
