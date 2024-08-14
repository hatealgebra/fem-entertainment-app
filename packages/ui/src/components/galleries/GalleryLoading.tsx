import ThumbnailLoading from "../thumbnail/ThumbnailLoading";
import { PiPopcornDuotone } from "react-icons/pi";

interface GalleryLoadingProps {
  isTrending?: boolean;
  isSearch?: boolean;
}

const GalleryLoading = ({
  isSearch,
  isTrending = false,
}: GalleryLoadingProps) => {
  if (!isSearch) {
    return Array.from({ length: 10 }).map((_, index) => (
      <ThumbnailLoading key={index} isTrending={isTrending} />
    ));
  }

  return (
    <div className="grid gap-5 items-center content-center justify-center justify-items-center h-[20vh] w-full">
      <PiPopcornDuotone className="animate-bounce" size={100} />
      <span className="text-3xl font-medium tracking-wider uppercase">
        Searching for movies...
      </span>
    </div>
  );
};

export default GalleryLoading;
