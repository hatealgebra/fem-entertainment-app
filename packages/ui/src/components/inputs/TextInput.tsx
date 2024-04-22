import { Ref, forwardRef } from "react";
import { InputProps } from "./input";

interface TextInputProps extends InputProps {
  error?: string;
}

const TextInput = forwardRef(
  (
    { textContent, error, ...props }: TextInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className="relative grid grid-cols-45w-full items-center mr-[5%]">
        <input
          className={`peer w-[80%] col-span-4 focus:text-opacity-100 font-light ${textContent && "text-opacity-100"}`}
          type="text"
          ref={ref}
          autoComplete="off"
          {...props}
        />
        <span className="text-sm text-red">{error}</span>
        <div className="mt-[18px] col-span-5 border-b-blue border-b-[1px] w-full peer-focus:border-b-white" />
      </div>
    );
  }
);

export default TextInput;
