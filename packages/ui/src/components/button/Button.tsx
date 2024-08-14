import { ButtonHTMLAttributes } from "react";
import { CgSpinner } from "react-icons/cg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

const Button = ({ isLoading, loadingText, ...props }: ButtonProps) => {
  return (
    <button
      className="inline-flex items-center justify-center gap-4 bg-red text-base font-light text-white px-5 w-full pt-[14px] rounded-md text-center pb-[15px] hover:bg-white hover:text-black transition-all duration-300"
      {...props}
    >
      {isLoading ? (
        <>
          <CgSpinner size="25px" className="animate-spin" />
          {loadingText}...
        </>
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
