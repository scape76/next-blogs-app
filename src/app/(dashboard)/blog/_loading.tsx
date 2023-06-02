import * as React from "react";
import TranslatedText from "@/components/translation/translated-text";
import BlogItem from "@/components/blog-item";

interface loadingProps {}

const loading: React.FC<loadingProps> = ({}) => {
  return (
    <div className="container max-w-4xl pt-2 lg:pt-4">
      <h1 className="text-2xl">
        <TranslatedText tPath={"header.blog"} />
      </h1>
      <hr className="border-slate-200 my-4" />
      <div className="container max-w-5xl my-6">
        <div className="grid gap-10 sm:grid-cols-2">
          <BlogItem.Skeleton />
          <BlogItem.Skeleton />
        </div>
      </div>
    </div>
  );
};

export default loading;
