import * as React from "react";
import { notFound, redirect } from "next/navigation";
import type { Post, User } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import PostEditor from "@/components/editor";
import { getCurrentUser } from "@/lib/session";

interface pageProps {
  params: {
    postId: Post["id"];
  };
}

async function getPostById(postId: Post["id"], userId: User["id"]) {
  const post = await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });

  return post;
}

const page = async ({ params }: pageProps) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const post = await getPostById(params.postId, user?.id);

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
