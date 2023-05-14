import { FC } from "react";
import { formatDate, sortByDate } from "@/lib/utils";
import { db } from "@/lib/db";

import BlogItem from "@/components/blog-item";
import TranslatedText from "@/components/translation/translated-text";

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

const page = async ({}) => {
  const publishedPosts = (await getAllPublishedPosts()).sort((a, b) =>
    sortByDate(b.updatedAt, a.updatedAt)
  );

  return (
    <div className="container max-w-4xl pt-2 lg:pt-4">
      <h1 className="text-2xl">
        <TranslatedText tPath={"header.blog"} />
      </h1>
      <hr className="border-slate-200 my-4" />
      {publishedPosts.length ? (
        <div className="container max-w-5xl my-6">
          <div className="grid gap-10 sm:grid-cols-2">
            {publishedPosts.map((post) => (
              <BlogItem
                key={post.id}
                post={{
                  id: post.id,
                  image: post.image,
                  title: post.title,
                  createdAt: post.createdAt,
                  authorName: post.author?.name || post.author?.email,
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-lg">
          <TranslatedText tPath="exceptions.404" />
        </p>
      )}
    </div>
  );
};

export default page;
