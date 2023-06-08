import * as React from "react";
import DashboardHeader from "@/components/dashboard-header";
import DashboradShell from "@/components/shell";
import PostItem from "@/components/post-item";

interface loadingProps {}

const loading: React.FC<loadingProps> = ({}) => {
  return (
    <DashboradShell>
      <DashboardHeader
        titleTPath="profile.collaboration.header.title"
        subtitleTPath="profile.collaboration.header.subtitle"
      ></DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
      </div>
    </DashboradShell>
  );
};

export default loading;
