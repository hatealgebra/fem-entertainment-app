import GalleryWrapper from "../../components/GalleryWrapper";
import TrendingGalleryWrapper from "../../components/TrendingGalleryWrapper";

const Page = () => {
  return (
    <>
      <TrendingGalleryWrapper />
      <GalleryWrapper headingText="Recommended for you" />
    </>
  );
};

export default Page;
