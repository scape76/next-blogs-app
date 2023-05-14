import { routeContextSchema } from "@/app/api/posts/[postId]/route";
import { validateUserHasAccessToPost } from "@/app/api/posts/[postId]/route";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import * as z from "zod";

import { Actions } from "@prisma/client";
import { collaboratorAddSchema } from "@/lib/validations/collaborator";

export async function PUT(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (
      !(await validateUserHasAccessToPost(
        params.postId,
        Actions.ADD_COLLABORATOR
      ))
    ) {
      return new Response(
        "You are not allowed to add collaborators to this post",
        { status: 403 }
      );
    }

    const json = await req.json();
    const body = collaboratorAddSchema.parse(json);

    const user = await getCurrentUser();

    const post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        author: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!post) {
      return new Response("Post not found", {
        status: 400,
      });
    }

    if (user?.email === body.collaboratorEmail) {
      return new Response("You cannot add yourself as a collaborator", {
        status: 400,
      });
    }

    // post.authorId == свій ід та айді автора
    // post.author.email == body.collaboratorEmail

    if (post.author.email === body.collaboratorEmail) {
      return new Response("You cannot add an author as a collaborator", {
        status: 400,
      });
    }

    const collaborator = await db.user.findFirst({
      where: { email: body.collaboratorEmail },
    });

    if (!collaborator) {
      return new Response("User with such email not found", { status: 404 });
    }

    const candidate = await db.collaborator.findFirst({
      where: {
        userId: collaborator.id,
        postId: params.postId,
      },
    });

    if (candidate) {
      return new Response("You already added this user", { status: 400 });
    }

    await db.collaborator.create({
      data: {
        userId: collaborator.id,
        postId: params.postId,
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
