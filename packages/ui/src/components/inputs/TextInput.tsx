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
      <div className="relative grid grid-cols-45 w-full items-center mr-[5%]">
        <input
          className={`peer w-full col-span-4 focus:text-opacity-100 font-light ${textContent && "text-opacity-100"}`}
          type="text"
          ref={ref}
          autoComplete="off"
          {...props}
        />
        {error && (
          <span className="text-sm w-min-content max-w-[150px] text-red">
            {error}
          </span>
        )}
        <div className="mt-[18px] col-span-5 border-b-blue border-b-[1px] w-full peer-focus:border-b-white" />
      </div>
    );
  }
);

export default TextInput;
