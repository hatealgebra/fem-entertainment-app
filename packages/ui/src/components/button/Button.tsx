import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: ButtonProps) => {
  return (
    <button
      className="bg-red text-base font-light text-white px-5 w-full pt-[14px] rounded-md text-center pb-[15px] hover:bg-white hover:text-black transition-all duration-300"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
