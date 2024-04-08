import { Ref, forwardRef } from "react";
import { InputProps } from "./input";

interface TextInputProps extends InputProps {
  error?: string;
}

const TextInput = forwardRef(
  ({ textContent, ...props }: TextInputProps, ref: Ref<HTMLInputElement>) => {
    return (
      <div className="relative flex w-full mr-[5%]">
        <input
          className={`peer w-[80%] focus:text-opacity-100 ${textContent && "text-opacity-100"}`}
          type="text"
          ref={ref}
          autoComplete="off"
          {...props}
        />
        <span className="w-[20%]"></span>
        <div className="absolute peer-focus:border-b-blue border-b-2 w-full" />
      </div>
    );
  }
);

export default TextInput;
