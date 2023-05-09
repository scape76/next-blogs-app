import { FC, ReactNode } from "react";
import TranslatedText from "./translation/translated-text";

interface TechnologyBoxProps {
  children: ReactNode;
  title: string;
  tPath: string;
}

const TechnologyBox: FC<TechnologyBoxProps> = ({ children, title, tPath }) => {
  return (
    <div className="relative overflow-hidden flex-grow max-w-[300px] rounded-lg border border-accent bg-background p-2 shadow-2xl">
      <div className="flex flex-col gap-y-2 p-6 rounded">
        {children}
        <h2 className="text-bold text-xl ">{title}</h2>
        <p className="">
          <TranslatedText tPath={`home.technologies.${tPath}`} />
        </p>
      </div>
    </div>
  );
};

export default TechnologyBox;
