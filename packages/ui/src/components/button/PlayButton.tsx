import Image from "next/image";
import { FaCirclePlay } from "react-icons/fa6";

type ThemeType = Record<
  "default" | "contrast" | "outline",
  {
    background: string;
    content: string;
    border: string;
    iconColor: string;
  }
>;

const theme: ThemeType = {
  default: {
    background: "bg-[rgba(255,255,255,.5)]",
    content: "white",
    border: "border-none",
    iconColor: "white",
  },
  contrast: {
    background: "bg-[#fff]",
    content: "text-black",
    border: "border-white",
    iconColor: "black",
  },
  outline: {
    background: "bg-[rgba(255, 255, 255, .1)]",
    content: "white",
    border: "border-white",
    iconColor: "white",
  },
};

interface PlayButtonProps {
  onClick: () => void;
  isSmall?: boolean;
  text?: string;
  themeKey: keyof ThemeType;
  className?: string;
}

const PlayButton = ({
  onClick,
  text = "Play",
  isSmall,
  themeKey = "default",
  className,
}: PlayButtonProps) => {
  const { background, content, border, iconColor } = theme[themeKey];
  return (
    <button
      onClick={onClick}
      className={`
        h-fit opacity-100 inline-flex rounded-full ${background}  w-fit border-[1px] ${border}
      ${!isSmall ? "pl-[9px] pr-8 py-[9px] gap-x-[19px]" : " pl-3 pr-4 py-2 gap-x-3"}
      ${className}
      `}
    >
      <FaCirclePlay color={iconColor} size={!isSmall ? "30px" : "20px"} />
      <span
        className={`${content} ${!isSmall ? "text-xl" : ""} ${isSmall && "text-md"}`}
      >
        {text}
      </span>
    </button>
  );
};

export default PlayButton;
