import Thumbnail from "../thumbnail/Thumbnail";
import Section from "../sections/Section";

const getMoviesData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/media?isTrending");
    return await res.json();
  } catch (e) {
    return { error: "Internal Server Error" };
  }
};

const TrendingGallery = async () => {
  const moviesData = await getMoviesData();
  return (
    <Section headingText="Trending">
      <div className="w-full overflow-scroll no-scrollbar">
        <div className="w-max flex gap-x-4 flex-none">
          {moviesData.data.map((movie) => (
            <Thumbnail key={movie.title} {...movie} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TrendingGallery;
