import { FC, ReactNode } from "react";

interface TechnologyBoxProps {
  children: ReactNode;
  title: string;
  content: string;
}

const TechnologyBox: FC<TechnologyBoxProps> = ({
  children,
  title,
  content,
}) => {
  return (
    <div className="relative overflow-hidden flex-grow max-w-[300px] rounded-lg border border-accent bg-foreground p-2 shadow-2xl">
      <div className="flex flex-col gap-y-2 p-6 rounded">
        {children}
        <h2 className="text-bold text-xl ">{title}</h2>
        <p className="">{content}</p>
      </div>
    </div>
  );
};

export default TechnologyBox;
