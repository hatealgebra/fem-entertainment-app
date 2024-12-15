import { FC, ReactNode } from "react";

export interface SectionProps {
  headingText?: string;
  children: ReactNode;
  NextRightElement?: FC;
}

// TODO: Should be only the wrapper with padding
// TODO: Create subsctions from this main one

const Section = ({ headingText, children, NextRightElement }: SectionProps) => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-[10%] items-center">
      {headingText && <h1>{headingText}</h1>}
      {NextRightElement && <NextRightElement />}
      <div className="mt-[25px] row-start-2 col-span-2">{children}</div>
    </div>
  );
};

export default Section;
