import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { courseCreateSchema } from "@/lib/validations/course";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = courseCreateSchema.parse(json);

    const course = await db.course.create({
      data: {
        authorId: session.user.id,
        title: body.title,
      },
      select: {
        title: true,
        id: true,
        imageId: true,
      },
    });

    return new Response(JSON.stringify(course));
  } catch (err) {
    if (err instanceof ZodError) {
      return new Response(JSON.stringify(err.errors), { status: 522 });
    }
    return new Response(null, { status: 500 });
  }
}
