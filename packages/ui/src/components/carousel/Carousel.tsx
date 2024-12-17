import { ReactNode, useEffect, useRef, useState } from "react";
import ArrowButton from "../button/ArrowButton";

interface CarouselProps {
  children: ReactNode;
  showControls?: boolean;
}

const Carousel = ({ children, showControls }: CarouselProps) => {
  const carouselContentRef = useRef(null);
  const [position, setPosition] = useState<number>(0);

  const scrollLeft = () => {
    setPosition((oldPos) => (!oldPos ? 0 : oldPos - 1));
  };

  const scrollRight = () => {
    setPosition((oldPos) => (oldPos === carouselLength ? oldPos : oldPos + 1));
  };

  const childNodes = (carouselContentRef?.current! as HTMLDivElement)
    ?.childNodes;
  const carouselLength = childNodes?.length - 1;

  if (childNodes) {
    const cardElement = childNodes[position] as HTMLDivElement;
    cardElement?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
  return (
    <div
      className={`relative min-h-[300px] w-full ${showControls ? "max-w-fit" : "animate-pulse w-full bg-darkBlue rounded-[20px] min-h-[300px] max-w-[1000px] aspect-[.7] xs:aspect-[1.1] sm:aspect-[1.4] sm:max-h-[450px] md:max-h-[500px]"}`}
    >
      <div
        ref={carouselContentRef}
        className="flex w-full overflow-hidden gap-x-4 remove-scrollbar  max-w-[1200px]"
      >
        {children}
      </div>
      <div className="absolute flex gap-x-1 z-10 top-3 h-fit right-5 md:top-[unset] md:bottom-10 md:right-10 md:gap-x-2">
        {showControls && (
          <>
            <ArrowButton onClick={scrollLeft} active={position !== 0} />
            <ArrowButton
              onClick={scrollRight}
              direction="right"
              active={position !== carouselLength}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Carousel;
