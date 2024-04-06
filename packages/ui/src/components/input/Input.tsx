import { InputHTMLAttributes, Ref, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  textContent: string;
  isSearch?: boolean;
  error?: string;
}

// TODO: Add custom cursor
const Input = forwardRef(
  (
    { textContent, isSearch, errors, ...props }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className="relative flex w-full mr-[5%]">
        <input
          className={`peer bg-[transparent] w-[70%] caret-red text-3xl font-light outline-none text-[white] max-w-full z-10 text-opacity-50 ${textContent && "text-opacity-100"} ${!isSearch && "text-base"}`}
          type="text"
          ref={ref}
          autoComplete="off"
          {...props}
        />
        <div
          className={`absolute w-full bottom-[-14px] border-b-2 border-b-[transparent] peer-focus:border-b-blue`}
        />
      </div>
    );
  }
);

export default Input;
