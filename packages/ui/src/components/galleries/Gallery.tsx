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
  handleBookmark: (movieId: string) => Promise<Response>;
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
  return (
    <Section
      headingText={
        searchString
          ? `Found ${totalLength} for '${searchString}'`
          : headingText
      }
    >
      <div className="flex max-w-[100%] flex-wrap gap-x-[29px] gap-y-6">
        {isLoading && <GalleryLoading isSearch={!!searchString?.length} />}
        {!isLoading && !totalLength && (
          <h3 className="my-[10vh] w-full text-center">
            There are no movies with the provided search
          </h3>
        )}
        {error && <p>Error: {error.message}</p>}
        {!isLoading &&
          !error &&
          moviesData.length &&
          moviesData.map((movie) => (
            <Thumbnail
              key={movie.title}
              handleBookmark={handleBookmark}
              {...movie}
              // isTrending={false}
              isBookmarked={bookmarkedMovies?.includes(movie._id)}
            />
          ))}
      </div>
    </Section>
  );
};

export default Gallery;
