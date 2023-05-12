import * as z from "zod";
import { routeContextSchema } from "../route";
import { validateUserHasAccessToPost } from "@/app/api/posts/[postId]/route";
import { db } from "@/lib/db";
import { Actions } from "@prisma/client";

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (
      !(await validateUserHasAccessToPost(params.postId, Actions.MANAGE_STATE))
    ) {
      return new Response("You are not allowed to archive this post", {
        status: 403,
      });
    }

    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        published: false,
      },
    });

    return new Response(null, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify(err.message), { status: 500 });
    }

    return new Response(null, { status: 500 });
  }
}
