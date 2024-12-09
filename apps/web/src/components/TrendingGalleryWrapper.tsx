"use client";
import Carousel from "@repo/ui/components/carousel/Carousel.tsx";
import TrendingCard from "@repo/ui/components/trendingCard/TrendingCard.tsx";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const TrendingGalleryWrapper = () => {
  const { data: moviesData, isLoading } = useSWR(
    "/api/media?isTrending=true",
    fetcher
  );

  return (
    <Carousel showControls={!isLoading}>
      {moviesData?.data?.map((movieData) => (
        <TrendingCard key={movieData.id} {...movieData} />
      ))}
    </Carousel>
  );
};

export default TrendingGalleryWrapper;
