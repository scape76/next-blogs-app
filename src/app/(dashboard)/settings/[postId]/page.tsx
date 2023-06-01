import * as React from "react";

import { Post } from "@prisma/client";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import PermissionsToggle from "@/components/permissions-toggle";

interface pageProps {
  params: {
    postId: Post["id"];
  };
}

export const metadata = {
  title: "Your post collaboration settings",
};

const page = async ({ params }: pageProps) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn || "/login");
  }

  const post = await db.post.findFirst({
    where: {
      id: params.postId,
    },
    include: {
      collaborators: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!post) {
    redirect("/profile");
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4">
      {post.collaborators.length ? (
        post.collaborators.map((collaborator) => (
          <div
            className="w-full p-4 border border-border rounded flex items-center justify-between"
            key={collaborator.id}
          >
            <b>{collaborator.user.name}</b>
            <PermissionsToggle
              initialPermissions={collaborator.permissions}
              postId={post.id}
              collaboratorId={collaborator.id}
            />
          </div>
        ))
      ) : (
        <p>You have no collaborators on this post</p>
      )}
    </div>
  );
};

export default page;
