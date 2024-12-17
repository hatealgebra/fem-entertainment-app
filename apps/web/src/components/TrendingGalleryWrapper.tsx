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
      {isLoading && (
        <div className="animate-pulse w-full bg-darkBlue rounded-[20px] min-h-[300px] max-w-[1000px] aspect-[.7] xs:aspect-[1.1] sm:aspect-[1.4] sm:max-h-[450px] md:max-h-[500px]"></div>
      )}
      {!isLoading &&
        moviesData?.data?.map((movieData) => (
          <TrendingCard
            key={movieData.id}
            isLoading={isLoading}
            {...movieData}
          />
        ))}
    </Carousel>
  );
};

export default TrendingGalleryWrapper;
