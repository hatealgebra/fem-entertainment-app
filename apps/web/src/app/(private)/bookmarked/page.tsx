import GalleryWrapper from "../../../components/GalleryWrapper";

const Page = () => {
  return (
    <GalleryWrapper
      headingText="Bookmarked Movies"
      queryParams="category=bookmarked"
    />
  );
};

export default Page;
