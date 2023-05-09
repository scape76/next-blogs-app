import * as React from "react";
import TranslatedText from "./translation/translated-text";

interface DashboardHeaderProps {
  titleTPath: string;
  textTPath: string;
  children?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  titleTPath,
  textTPath,
  children,
}) => {
  return (
    <div className="flex items-center justify-between mt-2 mb-4">
      <div className="flex flex-col gap-y-2 ">
        <h1 className="font-bold text-xl">
          <TranslatedText tPath={titleTPath} />
        </h1>
        <span className="text-md">
          <TranslatedText tPath={textTPath} />
        </span>
      </div>
      {children}
    </div>
  );
};

export default DashboardHeader;
