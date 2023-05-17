import * as React from "react";

import { Icons } from "@/components/icons";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <article className="container relative max-w-3xl py-2">
      <Link
        className="absolute top-8 left-[-100px] hidden items-center justify-center text-sm font-medium xl:inline-flex"
        href="/blog"
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div className="container prose prose-stone">
        {children}
        <Link href="/blog">
          <Button variant="ghost" className="text-foreground xl:hidden">
            <Icons.arrowLeft  className="w-4 h-4"/>
            See all posts
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default layout;
