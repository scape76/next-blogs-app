import * as React from "react";
import { formatDate } from "@/lib/utils";
import { Actions, Post, User } from "@prisma/client";

import Link from "next/link";
import PostOperations from "@/components/post-operations";

interface PostItem {
  post: Pick<Post, "id" | "title" | "published" | "updatedAt"> & {
    authorName?: string | null;
    permissions?: Actions[] | null;
  };
}

const PostItem: React.FC<PostItem> = ({ post }) => {
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
      <PostOperations
        post={{
          id: post.id,
          published: post.published,
          permissions: post.permissions,
        }}
      />
      {/* <PostDeleteButton id={post.id} published={post.published} /> */}
    </div>
  );
};

export default PostItem;
