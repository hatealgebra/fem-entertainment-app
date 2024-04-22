import Thumbnail from "../thumbnail/Thumbnail";
import Section from "../sections/Section";

const getMovieData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/media?isTrending=true");
    return await res.json();
  } catch (e) {
    console.log(e);
    return { error: "Internal Server Error" };
  }
};

const TrendingGallery = async () => {
  const moviesData = await getMovieData();

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
