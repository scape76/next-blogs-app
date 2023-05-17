import * as React from "react";
import { formatDate } from "@/lib/utils";
import { Actions, Post } from "@prisma/client";

import Link from "next/link";
import PostOperations from "@/components/post-operations";
import Button from "./ui/Button";

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
        {isAuthor && (
          <Link href={`/settings/${post.id}`}>
            <Button variant="ghost">Collaboration settings</Button>
          </Link>
        )}
        <PostOperations
          post={{
            id: post.id,
            published: post.published,
            permissions: post.permissions,
          }}
        />
      </div>
      {/* <PostDeleteButton id={post.id} published={post.published} /> */}
    </div>
  );
};

export default PostItem;
