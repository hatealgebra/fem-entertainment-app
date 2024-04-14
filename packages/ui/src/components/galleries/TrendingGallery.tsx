import { IMovie } from "@repo/misc/types/movies.js";
import Thumbnail from "../thumbnail/Thumbnail";
import Section from "../sections/Section";

interface TrendingGalleryProps {
  moviesData: IMovie[];
}

const TrendingGallery = ({ moviesData }: TrendingGalleryProps) => {
  return (
    <Section headingText="Trending">
      <div className="overflow-scroll no-scrollbar">
        <div className="w-max flex gap-x-4 flex-none">
          {moviesData.map((movie) => (
            <Thumbnail
              key={movie.title}
              isTrending
              isTouch={false}
              {...movie}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TrendingGallery;
