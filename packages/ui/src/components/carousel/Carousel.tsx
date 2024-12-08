import { ReactNode, useEffect, useRef, useState } from "react";
import ArrowButton from "../button/ArrowButton";

interface CarouselProps {
  children: ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
  const carouselContentRef = useRef(null);
  const [position, setPosition] = useState<number>(0);
  const childNodes = carouselContentRef?.current?.childNodes;
  const carouselLength = childNodes?.length - 1;

  const scrollLeft = () => {
    setPosition((oldPos) => (!oldPos ? 0 : oldPos - 1));
  };

  const scrollRight = () => {
    setPosition((oldPos) => (oldPos === carouselLength ? oldPos : oldPos + 1));
  };

  if (childNodes) {
    childNodes[position]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  useEffect(() => {
    const carouselElement = carouselContentRef.current! as HTMLDivElement;

    if (!carouselElement) {
      return;
    }

    carouselElement.addEventListener("wheel", (e) => e.preventDefault());

    return () => {
      carouselElement.removeEventListener("wheel", () => {});
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={carouselContentRef}
        className="flex w-full overflow-x-scroll gap-x-4 remove-scrollbar"
      >
        {children}
      </div>
      <div className="absolute bottom-10 right-10 flex gap-x-2 z-10">
        <ArrowButton onClick={scrollLeft} active={position !== 0} />
        <ArrowButton
          onClick={scrollRight}
          direction="right"
          active={position !== carouselLength}
        />
      </div>
    </div>
  );
};

export default Carousel;
