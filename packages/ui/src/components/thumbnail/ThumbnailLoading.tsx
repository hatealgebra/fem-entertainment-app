interface ThumbnailLoadingProps {
  isTrending?: boolean;
}

const ThumbnailLoading = ({ isTrending }: ThumbnailLoadingProps) => {
  return (
    <div className="flex flex-col gap-2 [&>*]:animate-pulse [&>*]:bg-darkBlue">
      <div
        className={`animate-pulse aspect-[2/3] rounded-lg sm:max-w-auto w-[90%] max-w-[260px] xs:w-full xs:max-w-[40vw] sm:max-w-[initial] sm:w-[25vw] sm:basis-[initial] md:w-[20vw] lg:w-[190px]`}
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
