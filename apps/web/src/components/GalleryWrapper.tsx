"use client";
import Gallery, {
  GalleryProps,
} from "@repo/ui/components/galleries/Gallery.tsx";
import useFetchMovies from "../hooks/useFetchMovies";

interface GalleryWrapperProps extends Pick<GalleryProps, "headingText"> {}

const GalleryWrapper = ({ headingText }: GalleryWrapperProps) => {
  const { data: movies, isLoading, error } = useFetchMovies();

  return (
    <Gallery
      headingText={headingText}
      moviesData={movies?.data || []}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default GalleryWrapper;
