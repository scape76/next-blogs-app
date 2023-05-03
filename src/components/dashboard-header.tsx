import * as React from "react";

interface DashboardHeaderProps {
  title: string;
  text?: string;
  children?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  text,
  children,
}) => {
  return (
    <div className="flex items-center justify-between mt-2 mb-4">
      <div className="flex flex-col gap-y-2 ">
        <h1 className="font-bold text-xl">{title}</h1>
        <span className="text-md">{text}</span>
      </div>
      {children}
    </div>
  );
};

export default DashboardHeader;
