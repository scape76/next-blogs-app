import { FC } from "react";
import { formatDate, sortByDate } from "@/lib/utils";
import { db } from "@/lib/db";

import Image from "next/image";
import BlogItem from "@/components/blog-item";

const getAllPosts = async () => {
  const posts = await db.post.findMany();

  const postsWithAuthors = await Promise.all(
    posts.map(async (post) => {
      const author = await db.user.findFirst({ where: { id: post.authorId } });
      return { ...post, author };
    })
  );

  return postsWithAuthors;
};

const page = async ({}) => {
  const publishedPosts = (await getAllPosts()).sort((a, b) =>
    sortByDate(b.createdAt, a.createdAt)
  ).filter(post => post.published);

  return (
    <div className="container max-w-4xl pt-2 lg:pt-4">
      <h1 className="text-2xl text-gray-700">Blogs</h1>
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
        <p className="text-lg text-gray-600">No posts found</p>
      )}
    </div>
  );
};

export default page;
