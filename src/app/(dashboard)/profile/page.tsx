import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import { sortByDate } from "@/lib/utils";

import PostItem from "@/components/post-item";
import DashboardHeader from "@/components/dashboard-header";
import CreatePostButton from "@/components/create-post-button";

const getPostsByUserId = async () => {
  const user = await getCurrentUser();

  const posts = await db.post.findMany({
    where: {
      authorId: user!.id,
    },
  });

  return posts;
};

const page = async ({}) => {
  const posts = (await getPostsByUserId()).sort((a, b) =>
    sortByDate(b.updatedAt, a.updatedAt)
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
