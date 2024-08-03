"use client";

import Section, { SectionProps } from "../sections/Section";
import { IMovie } from "@repo/misc/types/movies.js";
import Thumbnail from "../thumbnail/Thumbnail";
import ThumbnailLoading from "../thumbnail/ThumbnailLoading";

export interface GalleryProps extends Pick<SectionProps, "headingText"> {
  moviesData: IMovie[];
  totalLength: number;
  isLoading: boolean;
  error: Error;
  searchString: string | null;
}

const Gallery = ({
  headingText,
  searchString,
  moviesData,
  totalLength,
  isLoading,
  error,
}: GalleryProps) => {
  return (
    <Section
      headingText={
        searchString
          ? `Found ${totalLength} for '${searchString}'`
          : headingText
      }
    >
      <div className="flex max-w-[100%] flex-wrap gap-x-[29px] gap-y-6">
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <ThumbnailLoading key={index} />
          ))}
        {!isLoading && !totalLength && (
          <h3 className="my-[10vh] w-full text-center">
            There are no movies with the provided search
          </h3>
        )}
        {error && <p>Error: {error.message}</p>}
        {!isLoading &&
          !error &&
          moviesData.map((movie) => (
            <Thumbnail key={movie.title} {...movie} isTrending={false} />
          ))}
      </div>
    </Section>
  );
};

export default Gallery;
