"use client";
import { useContext } from "react";
import { AppContext } from "../state/AppContext";

interface TrendingGalleryWrapperProps {
  children: React.ReactNode;
}

const TrendingGalleryWrapper = ({ children }: TrendingGalleryWrapperProps) => {
  const { searchString } = useContext(AppContext);
  return !searchString && <>{children}</>;
};

export default TrendingGalleryWrapper;
