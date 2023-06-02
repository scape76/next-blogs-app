import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const loading: React.FC = ({}) => {
  return (
    <div className="prose prose-stone mx-auto px-4 pt-2 md:px-0 dark:prose-invert">
      <Skeleton className="w-3/4 h-8" />
      <Skeleton className="w-full h-[500px] my-10" />
    </div>
  );
};

export default loading;
