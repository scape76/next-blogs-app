import { Post } from "@prisma/client";
import { FC } from "react";
import { formatDate } from "@/lib/utils";

import Link from "next/link";
import { PostOperations } from "@/components/post-operations";
import PostDeleteButton from "./post-delete-button";

interface PostItem {
  post: Pick<Post, "id" | "title" | "createdAt">;
}

const PostItem: FC<PostItem> = ({ post }) => {
  return (
    <div className="flex items-center justify-between md:px-4 px-2 py-4 border border-gray-200 rounded">
      <div className="flex flex-col gap-y-2">
        <Link href={`/editor/${post.id}`}>
          <h1 className="font-semibold text-md">{post.title}</h1>
        </Link>
        <span className="text-xs text-gray-500">
          {formatDate(post.createdAt?.toDateString())}
        </span>
      </div>
      {/* <PostOperations post={{ id: post.id, title: post.title }} /> */}
      <PostDeleteButton id={post.id} />
    </div>
  );
};

export default PostItem;
