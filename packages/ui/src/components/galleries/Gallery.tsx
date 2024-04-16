import Section from "../sections/Section";
import { IMovie } from "@repo/misc/types/movies.js";
import Thumbnail from "../thumbnail/Thumbnail";

interface GalleryProps {
  headingText: string;
  moviesData: IMovie[];
}

const Gallery = ({ headingText, moviesData }: GalleryProps) => {
  return (
    <Section headingText={headingText}>
      <div className="flex max-w-[100%] flex-wrap gap-x-[29px] gap-y-6">
        {moviesData.map((movie) => (
          <Thumbnail key={movie.title} {...movie} isTrending={false} />
        ))}
      </div>
    </Section>
  );
};

export default Gallery;
