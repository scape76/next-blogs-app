import * as z from "zod";
import { routeContextSchema } from "../route";
import { validateUserHasAccessToPost } from "@/app/api/posts/[postId]/route";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await validateUserHasAccessToPost(params.postId))) {
      return new Response(null, { status: 403 });
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
