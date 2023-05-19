import * as React from "react";
import DashboardHeader from "@/components/dashboard-header";
import DashboradShell from "@/components/shell";
import CreatePostButton from "@/components/create-post-button";
import PostItem from "@/components/post-item";

interface loadingProps {}

const loading: React.FC<loadingProps> = ({}) => {
  return (
    <DashboradShell>
      <DashboardHeader
        titleTPath="profile.posts.header.title"
        textTPath="profile.posts.header.subtitle"
      >
        <CreatePostButton />
      </DashboardHeader>
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
