import TrendingGallery from "@repo/ui/components/galleries/TrendingGallery.tsx";
import GalleryWrapper from "../../src/components/GalleryWrapper";
import TrendingGalleryWrapper from "../../src/components/TrendingGalleryWrapper";

const Page = () => {
  return (
    <>
      <TrendingGalleryWrapper>
        <TrendingGallery />
      </TrendingGalleryWrapper>
      <GalleryWrapper headingText="Recommended for you" />
    </>
  );
};

export default Page;
