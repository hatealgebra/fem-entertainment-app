"use client";
import { useContext } from "react";
import { AppContext } from "../state/AppContext";
import useSWR from "swr";
import TrendingGallery from "@repo/ui/components/galleries/TrendingGallery.tsx";
import { bookmarkMovie } from "../services/client/user.services";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TrendingGalleryWrapper = () => {
  const {
    data: moviesData,
    isLoading,
    error,
  } = useSWR("/api/media?isTrending=true", fetcher);
  const { searchString } = useContext(AppContext);

  if (searchString) {
    return null;
  }

  return (
    <TrendingGallery
      moviesData={moviesData}
      isLoading={isLoading}
      error={error}
      handleBookmark={bookmarkMovie}
    />
  );
};

export default TrendingGalleryWrapper;
