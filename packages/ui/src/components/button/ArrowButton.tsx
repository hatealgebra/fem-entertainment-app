import { MdOutlineArrowBackIosNew } from "react-icons/md";

interface ArrowButtonProps {
  onClick: () => void;
  direction?: "left" | "right";
  active?: boolean;
}

const ArrowButton = ({
  onClick,
  direction = "left",
  active,
}: ArrowButtonProps) => {
  return (
    <button
      className={`${direction === "right" && "rotate-180"} aspect-square ${active ? "bg-mediumBlue" : "bg-grayText"} aspect-square inline-flex justify-center items-center items w-10 h-10 p-2 md:w-14 md:h-14 md:p-3 rounded-full hover:cursor-pointer`}
      onClick={onClick}
    >
      <MdOutlineArrowBackIosNew size="75%" />
    </button>
  );
};

export default ArrowButton;
