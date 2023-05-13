import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import { sortByDate } from "@/lib/utils";

import PostItem from "@/components/post-item";
import DashboardHeader from "@/components/dashboard-header";
import CreatePostButton from "@/components/create-post-button";
import { authOptions } from "@/lib/auth";

const page = async ({}) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const posts = await db.post.findMany({
    where: {
      authorId: user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="w-full px-2 md:px-0">
      <DashboardHeader
        titleTPath="profile.posts.header.title"
        textTPath="profile.posts.header.subtitle"
      >
        <CreatePostButton />
      </DashboardHeader>
      <div className="w-full">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={{
              id: post.id,
              title: post.title,
              updatedAt: post.updatedAt,
              published: post.published,
              permissions: [
                "ADD_COLLABORATOR",
                "CREATE",
                "DELETE",
                "EDIT",
                "MANAGE_STATE",
              ],
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
