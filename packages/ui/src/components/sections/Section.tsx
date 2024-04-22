export interface SectionProps {
  headingText: string;
  children: React.ReactNode;
}

const Section = ({ headingText, children }: SectionProps) => {
  return (
    <div>
      <h1>{headingText}</h1>
      <div className="mt-[25px]">{children}</div>
    </div>
  );
};

export default Section;
