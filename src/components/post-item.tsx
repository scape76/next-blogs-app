import * as React from "react";
import { formatDate } from "@/lib/utils";
import { Actions, Post } from "@prisma/client";

import Link from "next/link";
import PostOperations from "@/components/post-operations";
import { Skeleton } from "@/components/ui/skeleton";

interface PostItemProps {
  post: Pick<Post, "id" | "title" | "published" | "updatedAt"> & {
    authorName?: string | null;
    permissions?: Actions[] | null;
  };
  isAuthor?: boolean;
}

const PostItem = ({ post, isAuthor }: PostItemProps) => {
  return (
    <div
      className="flex items-center justify-between md:px-4 px-2 py-4 border border-gray-200 rounded"
      key={post.id}
    >
      <div className="flex flex-col gap-y-2">
        <Link href={`/editor/${post.id}`}>
          <h1 className="font-semibold text-md">{post.title}</h1>
        </Link>
        <span className="text-xs ">
          {formatDate(post.updatedAt?.toDateString())}
          {post.authorName && (
            <span>
              , <span className="font-semibold"> {post.authorName}</span>
            </span>
          )}
        </span>
      </div>
      <div className="flex items-center gap-x-2">
        <PostOperations
          post={{
            id: post.id,
            published: post.published,
            permissions: post.permissions,
          }}
          isAuthor={isAuthor}
        />
      </div>
    </div>
  );
};

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5"/>
        <Skeleton className="h-4 w-4/5"/>
      </div>
    </div>
  )
}

export default PostItem;
