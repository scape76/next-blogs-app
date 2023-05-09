import { getCurrentUser } from "@/lib/session";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { sortByDate } from "@/lib/utils";

import PostItem from "@/components/post-item";
import DashboardHeader from "@/components/dashboard-header";
import CreatePostButton from "@/components/create-post-button";

const getPostsByUserId = async (userId: User["id"]) => {
  const posts = await db.post.findMany({
    where: {
      authorId: userId,
    },
  });

  return posts;
};

const page = async ({}) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const posts = (await getPostsByUserId(user?.id)).sort((a, b) =>
    sortByDate(b.createdAt, a.createdAt)
  );

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
              createdAt: post.createdAt,
              published: post.published,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
