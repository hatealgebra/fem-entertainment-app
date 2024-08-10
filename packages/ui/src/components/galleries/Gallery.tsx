"use client";

import Section, { SectionProps } from "../sections/Section";
import { IMovie } from "@repo/misc/types/movies.js";
import Thumbnail from "../thumbnail/Thumbnail";
import GalleryLoading from "./GalleryLoading";

export interface GalleryProps extends Pick<SectionProps, "headingText"> {
  moviesData: IMovie[];
  totalLength: number;
  isLoading: boolean;
  error: Error;
  searchString: string | null;
  bookmarkedMovies: string[];
  handleBookmark: (movieId: string) => Promise<void>;
}

const Gallery = ({
  headingText,
  searchString,
  moviesData,
  totalLength,
  bookmarkedMovies,
  handleBookmark,
  isLoading,
  error,
}: GalleryProps) => {
  console.log({ bookmarkedMovies });
  return (
    <Section
      headingText={
        searchString
          ? `Found ${totalLength} for '${searchString}'`
          : headingText
      }
    >
      <div className="flex max-w-[100%] flex-wrap gap-x-[29px] gap-y-6">
        {isLoading && <GalleryLoading />}
        {!isLoading && !totalLength && (
          <h3 className="my-[10vh] w-full text-center">
            There are no movies with the provided search
          </h3>
        )}
        {error && <p>Error: {error.message}</p>}
        {!isLoading &&
          !error &&
          moviesData.map((movie) => (
            <Thumbnail
              key={movie.title}
              handleBookmark={handleBookmark}
              {...movie}
              isTrending={false}
              isBookmarked={bookmarkedMovies?.includes(movie._id)}
            />
          ))}
      </div>
    </Section>
  );
};

export default Gallery;
