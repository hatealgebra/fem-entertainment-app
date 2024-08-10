import ThumbnailLoading from "../thumbnail/ThumbnailLoading";

interface GalleryLoadingProps {
  isTrending?: boolean;
}

const GalleryLoading = ({ isTrending = false }: GalleryLoadingProps) => {
  return Array.from({ length: 10 }).map((_, index) => (
    <ThumbnailLoading key={index} isTrending={isTrending} />
  ));
};

export default GalleryLoading;
