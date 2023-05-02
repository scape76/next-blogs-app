import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { postCreateSchema } from "@/lib/validations/post";
import * as z from "zod";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;

    const posts = await db.post.findMany({
      where: {
        authorId: user.id,
      },
      select: {
        title: true,
        id: true,
        published: true,
        createdAt: true,
      },
    });

    return new Response(JSON.stringify(posts));
  } catch (err) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;

    const json = await req.json();
    const body = postCreateSchema.parse(json);

    const post = await db.post.create({
      data: {
        authorId: user.id,
        title: body.title,
        content: body.content,
      },
      select: {
        id: true,
      },
    });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify(err.errors), { status: 522 });
    }

    return new Response(null, { status: 500 });
  }
}
