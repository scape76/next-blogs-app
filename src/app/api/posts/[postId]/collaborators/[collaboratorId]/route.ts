import { validateUserHasAccessToPost } from "@/app/api/posts/[postId]/route";
import { db } from "@/lib/db";
import * as z from "zod";
import { collaboratorPutSchema } from "@/lib/validations/collaborator";

// import { collaboratorPutSchema } from "@/lib/validations/collaborator";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
    collaboratorId: z.string(),
  }),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await validateUserHasAccessToPost(params.postId))) {
      return new Response(
        "You are not allowed to manage collaborator permissions",
        { status: 403 }
      );
    }

    const json = await req.json();
    const body = collaboratorPutSchema.parse(json);

    // TODO : body has to be typeof {permissions: Object.values(Actions)}
    // const body = JSON.parse(json);

    // check if user has access to post (already done)
    // check if collaborator exists

    const candidate = await db.collaborator.findFirst({
      where: {
        id: params.collaboratorId
      },
    });
    console.log(candidate);
    console.log(params);

    if (!candidate) {
      return new Response("Collaborator not found", {
        status: 400,
      });
    }

    await db.collaborator.update({
      where: {
        id: params.collaboratorId
      },
      data: {
        permissions: body.permissions,
      },
    });

    return new Response("Permissions were updated successfully", {
      status: 200,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify(err.errors), { status: 422 });
    }

    return new Response(null, { status: 502 });
  }
}
