import * as React from "react";

import { Icons } from "@/components/icons";
import Link from "next/link";

interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <article className="container relative max-w-3xl py-2 lg:py-4">
      <Link className="absolute top-8 left-[-100px] hidden items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900 xl:inline-flex" href="/blogs">
      <Icons.chevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div className="container max-w-3xl">{children}</div>
    </article>
  );
};

export default layout;
