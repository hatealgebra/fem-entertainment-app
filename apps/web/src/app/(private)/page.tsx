import GalleryWrapper from "../../components/GalleryWrapper";
import TrendingGalleryWrapper from "../../components/TrendingGalleryWrapper";

const Page = () => {
  return (
    <>
      <TrendingGalleryWrapper />
      <GalleryWrapper
        headingText="Best rated"
        queryParams="queryType=bestRated"
      />
      <GalleryWrapper
        headingText="Populare this year"
        queryParams="queryType=thisYear"
      />
      <GalleryWrapper headingText="Planned" queryParams="queryType=planned" />
    </>
  );
};

export default Page;
