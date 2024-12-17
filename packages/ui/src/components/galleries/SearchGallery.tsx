import { IMovie } from "@repo/misc/types/movies.js";
import useWindowSize from "../../hooks/useWindowSize";
import ThumbnailPoster from "../thumbnail/ThumbnailPoster";

interface SearchGalleryProps {
  isLoading: boolean;
  searchString: string;
  searchResults: IMovie[];
}

const SearchGallery = ({
  searchResults,
  searchString,
  isLoading,
}: SearchGalleryProps) => {
  const { width: windowWidth } = useWindowSize();

  const widthPoster = windowWidth < 400 ? windowWidth / 2.5 : 180;
  const heightPoster = windowWidth < 400 ? windowWidth / 1.5 : 250;

  const posterSize = {
    width: windowWidth > 350 ? widthPoster : 220,
    height: windowWidth > 350 ? heightPoster : 300,
  };

  return (
    <div>
      <h3 className="py-5">
        <span className="font-thin">Results for:</span>{" "}
        <span className="font-semibold">{searchString}</span>
      </h3>
      <div className="flex flex-wrap gap-x-4 gap-y-5">
        {isLoading &&
          new Array(14)
            .fill("")
            .map((_) => (
              <div
                className={`bg-slate-200 h-[${posterSize.height}px] w-[${posterSize.width}px] animate-pulse`}
              />
            ))}
        {!isLoading &&
          searchResults?.length &&
          searchResults.map((movie) => (
            <ThumbnailPoster
              key={`${movie.title} poster path`}
              posterSize={posterSize}
              {...movie}
            />
          ))}
        {!isLoading && !searchResults?.length && (
          <h2 className="pt-5 w-full text-center">No movies found</h2>
        )}
      </div>
    </div>
  );
};

export default SearchGallery;
