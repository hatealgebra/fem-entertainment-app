import Thumbnail from "../thumbnail/Thumbnail";
import Section from "../sections/Section";
import { IMovie } from "@repo/misc/types/movies.js";
import GalleryLoading from "./GalleryLoading";

interface TrendingGalleryProps {
  moviesData: { data: IMovie[] };
  isLoading: boolean;
  error: Error;
  bookmarkedMovies: string[];
  handleBookmark: (movieId: number) => Promise<Response>;
}

const TrendingGallery = ({
  moviesData,
  isLoading,
  error,
  bookmarkedMovies,
  handleBookmark,
}: TrendingGalleryProps) => {
  return (
    <Section headingText="Trending">
      <div className="w-full overflow-x-scroll no-scrollbar">
        <div className="w-max flex gap-x-4 flex-none">
          {isLoading && <GalleryLoading isTrending />}
          {!isLoading &&
            !error &&
            moviesData.data.length &&
            moviesData.data.map((movie) => (
              <Thumbnail
                key={movie.title}
                {...movie}
                handleBookmark={handleBookmark}
                // isTrending={true}
                isBookmarked={bookmarkedMovies?.includes(movie._id)}
              />
            ))}
        </div>
      </div>
    </Section>
  );
};

export default TrendingGallery;
