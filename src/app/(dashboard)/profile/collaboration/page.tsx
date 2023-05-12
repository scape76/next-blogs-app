import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import { sortByDate } from "@/lib/utils";

import PostItem from "@/components/post-item";
import DashboardHeader from "@/components/dashboard-header";

const getCollaboratePostsByUserId = async () => {
  const user = await getCurrentUser();

  const posts = await db.post.findMany({
    where: {
      collaborators: {
        some: {
          userId: user!.id,
        },
      },
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      collaborators: {
        where: {
          userId: user!.id,
        },
        select: {
          userId: true,
          permissions: true,
        },
      },
    },
  });
  return posts;
};

const page = async ({}) => {
  const posts = (await getCollaboratePostsByUserId()).sort((a, b) =>
    sortByDate(b.updatedAt, a.updatedAt)
  );

  return (
    <div className="w-full px-2 md:px-0">
      <DashboardHeader
        titleTPath="profile.collaboration.header.title"
        textTPath="profile.collaboration.header.subtitle"
      ></DashboardHeader>
      <div className="w-full">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={{
              id: post.id,
              title: post.title,
              updatedAt: post.updatedAt,
              published: post.published,
              authorName: post.author.name,
              permissions: post.collaborators[0].permissions,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
