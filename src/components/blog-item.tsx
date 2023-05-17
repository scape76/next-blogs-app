import { FC } from "react";
import type { Post } from "@prisma/client";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

interface BlogItem {
  post: Pick<Post, "id" | "image" | "title" | "createdAt"> & {
    authorName: string | null | undefined;
  };
}

const getImageFromPopsy = (id: string) => {
  const imgUrls = [
    "app-launch",
    "work-party",
    "student-with-diploma",
    "studying",
    "keynote-presentation",
  ];
  const res = id.codePointAt(id.length - 1);

  if (res == undefined) {
    return "https://illustrations.popsy.co/gray/app-launch.svg";
  }

  return `https://illustrations.popsy.co/gray/${imgUrls[res % 5]}.svg`;
};

const BlogItem: FC<BlogItem> = ({ post }) => {
  return (
    <Link href={`/blog/${post.id}`}>
      <article className="group relative flex flex-col space-y-2 p-4 ">
        {/* {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={804}
            height={452}
            className="rounded-md border border-slate-200 bg-slate-200 transition-colors hover:border-slate-900"
          />
        )} */}
        <Image
          src={getImageFromPopsy(post.id)}
          alt={post.title}
          width={804}
          height={452}
          className="rounded-md border border-slate-200 bg-slate-200 transition-colors group-hover:border-slate-900"
        />
        <h2 className="text-2xl ">{post.title}</h2>
        <div className="flex justify-between items-center">
          <p className="text-sm">{formatDate(post.createdAt)}</p>
          {post.authorName && (
            <span className="text-xs">{post.authorName}</span>
          )}
        </div>
      </article>
    </Link>
  );
};

export default BlogItem;
