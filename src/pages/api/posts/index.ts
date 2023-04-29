import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import * as z from "zod";
import { authOptions } from "@/lib/auth";

import { withMethods } from "@/lib/api-middlewares/with-methods"

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  console.log(session);

  if (!session) {
    return res.status(403).end();
  }
  try {
    const body = postCreateSchema.parse(req.body);

    console.log("body:", body);

    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    return res.json(post);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(422).json(err.issues);
    }

    return res.status(500).end();
  }
}

export default withMethods(["POST"], handler)