import { FC } from "react";
import type { Post } from "@prisma/client";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

import Image from "next/image";
import Link  from "next/link";

interface BlogItem {
  post: Pick<Post, "id" | "image" | "title" | "createdAt"> & {
    authorName: string | null | undefined;
  };
}

const BlogItem: FC<BlogItem> = ({ post }) => {
  return (
    <Link className="" href={`/blogs/${post.id}`}>
      <article className="relative flex flex-col space-y-2 p-4 border border-gray-700 hover:bg-slate-200">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={804}
            height={452}
            className="rounded-md border border-slate-200 bg-slate-200 transition-colors hover:border-slate-900"
          />
        )}
        <h2 className="text-2xl text-gray-800">{post.title}</h2>
        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-600">{formatDate(post.createdAt)}</p>
          {post.authorName && (
            <span className="text-xs text-slate-400">{post.authorName}</span>
          )}
        </div>
      </article>
    </Link>
  );
};

export default BlogItem;
