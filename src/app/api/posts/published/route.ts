import { db } from "@/lib/db";
import { Post } from "@prisma/client";

export async function GET(req: Request) {
  const url = new URL(req.url);
  let cursor = url.searchParams.get("cursor") as string | null;
  let posts: Post[];
  let nextCursor: string;

  if (!cursor) {
    posts = await db.post.findMany({
      take: 2,
      where: {
        published: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    nextCursor = posts[posts.length - 1]?.id;
  } else {
    posts = await db.post.findMany({
      take: 2,
      skip: 1,
      cursor: {
        id: cursor,
      },
      where: {
        published: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    nextCursor = posts[posts.length - 1]?.id;
  }

  return new Response(JSON.stringify({ posts, nextCursor }), { status: 200 });
}
