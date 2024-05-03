import TrendingGallery from "@repo/ui/components/galleries/TrendingGallery.tsx";
import GalleryWrapper from "../../components/GalleryWrapper";
import TrendingGalleryWrapper from "../../components/TrendingGalleryWrapper";

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
