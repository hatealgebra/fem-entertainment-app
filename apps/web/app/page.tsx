import TrendingGallery from "@repo/ui/components/galleries/TrendingGallery.tsx";
import GalleryWrapper from "../src/components/GalleryWrapper";

const Page = () => {
  return (
    <>
      <TrendingGallery />
      <GalleryWrapper headingText="Recommended for you" />
    </>
  );
};

export default Page;
