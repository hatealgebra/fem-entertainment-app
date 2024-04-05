import { InputHTMLAttributes, Ref, forwardRef, useEffect, useRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  textContent: string;
}

const Input = forwardRef(
  ({ textContent, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
    const spanRef = useRef(null);

    useEffect(() => {
      if (!spanRef) {
        return;
      }

      const span = spanRef.current as HTMLSpanElement;
      span.textContent = textContent || "";
    }, [textContent]);

    return (
      <div className="relative flex w-full">
        <input
          className="bg-[transparent] text-3xl font-light outline-none text-[white] w-full max-w-full z-10 text-opacity-50 caret-[transparent] focus:text-opacity-100"
          type="text"
          ref={ref}
          {...props}
        />
        <span
          ref={spanRef}
          className={`absolute block text-[transparent] max-w-full  top-0 bottom-0 text-3xl border-[transparent] border-r-solid border-r-red z-0 border-2 animate-caretBlink`}
        />
      </div>
    );
  }
);

export default Input;
