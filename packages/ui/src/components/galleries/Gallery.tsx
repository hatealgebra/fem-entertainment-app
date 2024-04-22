"use client";
import Section, { SectionProps } from "../sections/Section";
import { IMovie } from "@repo/misc/types/movies.js";
import Thumbnail from "../thumbnail/Thumbnail";
import ThumbnailLoading from "../thumbnail/ThumbnailLoading";

export interface GalleryProps extends Pick<SectionProps, "headingText"> {
  moviesData: IMovie[];
  isLoading: boolean;
  error: Error;
}

const Gallery = ({
  headingText,
  moviesData,
  isLoading,
  error,
}: GalleryProps) => {
  return (
    <Section headingText={headingText}>
      <div className="flex max-w-[100%] flex-wrap gap-x-[29px] gap-y-6">
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <ThumbnailLoading key={index} />
          ))}
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
