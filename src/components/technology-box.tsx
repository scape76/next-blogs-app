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
    <div className="relative overflow-hidden flex-grow max-w-[300px] rounded-lg border border-slate-200 bg-white p-2 shadow-2xl">
      <div className="flex flex-col gap-y-2 p-6 rounded"> 
        {children}
        <h2 className="text-bold text-xl text-gray-800">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};

export default TechnologyBox;
