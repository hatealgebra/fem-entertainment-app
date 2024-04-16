import Image from "next/image";
import SearchForm from "./SearchForm";
import TrendingGallery from "@repo/ui/components/galleries/TrendingGallery.tsx";
import Gallery from "@repo/ui/components/galleries/Gallery.tsx";

const getMovieData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/movies");
    return await res.json();
  } catch (e) {
    console.log(e);
    return { error: "Internal Server Error" };
  }
};

const Page = async () => {
  const moviesData = await getMovieData();

  return (
    <>
      <TrendingGallery />
      <Gallery headingText="Recommended for you" moviesData={moviesData.data} />
    </>
  );
};

export default Page;
