import * as React from "react";
import { notFound } from "next/navigation";
import { Actions, Post } from "@prisma/client";

import PostEditor from "@/components/editor";
import { validateUserHasAccessToPost } from "@/app/api/posts/[postId]/route";

interface pageProps {
  params: {
    postId: Post["id"];
  };
}

export const metadata = {
  title: "Post editor",
  description: "Thanks to editor.js",
};

const page = async ({ params }: pageProps) => {
  const post = await validateUserHasAccessToPost(params.postId, Actions.EDIT);

  if (!post) {
    notFound();
  }

  return (
    <PostEditor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      }}
      readOnly={false}
    />
  );
};

export default page;
