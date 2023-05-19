import * as React from "react";
import DashboardHeader from "@/components/dashboard-header";
import DashboradShell from "@/components/shell";
import { Skeleton } from "@/components/ui/skeleton";

interface loadingProps {}

const loading: React.FC<loadingProps> = ({}) => {
  return (
    <DashboradShell>
      <DashboardHeader
        titleTPath="profile.settings.header.title"
        textTPath="profile.settings.header.subtitle"
      ></DashboardHeader>
      <div className="w-full flex justify-between">
        <Skeleton className="w-1/5 h-4" />
        <Skeleton className="w-6 h-6" />
      </div>
      <div className="w-full flex justify-between">
        <Skeleton className="w-2/5 h-4" />
        <Skeleton className="w-6 h-6" />
      </div>
    </DashboradShell>
  );
};

export default loading;
