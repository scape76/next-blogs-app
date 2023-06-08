import { sortByDate } from "@/lib/utils";
import { db } from "@/lib/db";

import TranslatedText from "@/components/translation/translated-text";
import BlogFeed from "@/components/blog-feed";

const getAllPublishedPosts = async () => {
  const posts = await db.post.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return posts;
};

const page = async () => {
  const publishedPosts = (await getAllPublishedPosts()).sort((a, b) =>
    sortByDate(b.updatedAt, a.updatedAt)
  );

  return (
    <div className="container max-w-4xl pt-2 lg:pt-4">
      <h1 className="text-2xl">
        <TranslatedText tPath={"header.blog"} />
      </h1>
      <hr className="border-slate-200 my-4" />
      <BlogFeed />
    </div>
  );
};


export default page;
