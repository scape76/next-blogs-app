import { db } from "@/lib/db";
import { getCurrentUser, getSession } from "@/lib/session";
import { Course } from "@prisma/client";
import { coursePatchSchema } from "@/lib/validations/course";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    courseId: z.string(),
  }),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!validateUserHasAccessToCourse(params.courseId)) {
      return new Response("You are not allowed to edit this course", {
        status: 403,
      });
    }

    const json = await req.json();
    const body = coursePatchSchema.parse(json);

    await db.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        title: body.title,
        imageId: body.imageId
      },
    });

    return new Response(null, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify(err.errors), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function validateUserHasAccessToCourse(id: Course["id"]) {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const course = await db.course.findFirst({
    where: {
      id,
      authorId: user.id,
    },
  });

  return course;
}
