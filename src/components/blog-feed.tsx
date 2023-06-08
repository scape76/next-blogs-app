"use client";
import * as React from "react";

import BlogItem from "./blog-item";
import { useInfiniteQuery } from "react-query";
import Button from "@/components/ui/Button";
import { toast } from "@/components/ui/use-toast";

function BlogFeed() {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery(
      ["query"],
      async ({ pageParam = null }) => {
        console.log(pageParam);
        const res = await fetch(
          `/api/posts/published${pageParam ? `?cursor=${pageParam}` : ""}`
        );
        return await res.json();
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor;
        },
      }
    );

  if (error)
    toast({ title: "Something went wrong...", variant: "destructive" });

  const posts = data?.pages.flatMap(({ posts }) => posts);

  return (
    <div className="container max-w-5xl my-6">
      <div className="grid gap-10 sm:grid-cols-2">
        {posts?.map((post) => (
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
      <div className="w-full text-center mt-4">
        <Button
          disabled={isFetching || !hasNextPage}
          onClick={() => fetchNextPage()}
          isLoading={isFetching}
        >
          {hasNextPage ? "Load more" : "Nothing to load"}
        </Button>
      </div>
    </div>
  );
}

export default BlogFeed;
