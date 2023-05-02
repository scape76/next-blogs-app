import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { postPatchSchema } from "@/lib/validations/post";
import { getServerSession } from "next-auth";
import { RequestStore } from "next/dist/client/components/request-async-storage";
import * as z from "zod";

export const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await validateUserHasAccessToPost(params.postId))) {
      return new Response(null, { status: 403 });
    }

    await db.post.delete({
      where: {
        id: params.postId,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await validateUserHasAccessToPost(params.postId))) {
      return new Response(null, { status: 403 });
    }

    const json = await req.json();
    const body = postPatchSchema.parse(json);

    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return new Response(null, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify(err.errors), { status: 422 });
    }

    return new Response(null, { status: 502 });
  }
}

export async function validateUserHasAccessToPost(postId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  const count = await db.post.count({
    where: {
      id: postId,
      authorId: user.id,
    },
  });

  return count > 0;
}
