interface ThumbnailLoadingProps {
  isTrending?: boolean;
}

const ThumbnailLoading = ({ isTrending }: ThumbnailLoadingProps) => {
  return (
    <div className="flex flex-col gap-2 [&>*]:animate-pulse [&>*]:bg-darkBlue">
      <div
        className={`animate-pulse ${isTrending ? "w-[240px] h-[140px] md:w-[470px] md:h-[230px]" : "w-[100%] h-[110px] sm:w-[164px] md:w-[220px] md:h-[140px] lg:w-[280px] lg:h-[226px]"}`}
      />
      {!isTrending && (
        <>
          <div className="h-2 w-[50%]" />
          <div className="h-4 w-[80%]" />
        </>
      )}
    </div>
  );
};

export default ThumbnailLoading;
