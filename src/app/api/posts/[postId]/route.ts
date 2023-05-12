import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { postPatchSchema, postPutSchema } from "@/lib/validations/post";
import { Actions } from "@prisma/client";
import * as z from "zod";

type PostActions = "edit" | "archive" | "add-collaborator" | "delete";

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

    if (!(await validateUserHasAccessToPost(params.postId, Actions.DELETE))) {
      return new Response("You are not allowed to delete this post", {
        status: 403,
      });
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

    if (!(await validateUserHasAccessToPost(params.postId, Actions.EDIT))) {
      return new Response("You are not allowed to edit this post", {
        status: 403,
      });
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
    const body = postPutSchema.parse(json);

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

export async function validateUserHasAccessToPost(
  postId: string,
  action?: Actions
) {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  const post = await db.post.findFirst({
    where: {
      id: postId,
      OR: [
        {
          authorId: user!.id,
        },
        {
          collaborators: {
            some: {
              userId: user!.id,
              permissions: {
                has: action || "CREATE",
              },
            },
          },
        },
      ],
    },
  });

  return post;
}
