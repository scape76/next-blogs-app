import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { withMethods } from "@/lib/api-middlewares/with-methods";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401).end();
  }

  const post = await db.post.findFirst({
    where: {
      id: req.query.postId as string,
    },
  });

  if (post?.authorId !== session.user.id) {
    throw res.status(403).end();
  }

  if (req.method === "DELETE") {
    await db.post.delete({
      where: {
        id: req.query.postId as string,
      },
    });

    return res.status(200).end();
  } else {
    const updatedPost = await db.post.update({
      where: {
        id: req.query.postId as string,
      },
      data: {
        title: req.body.title,
        content: req.body.content,
      },
    });

    return res.json(updatedPost);
  }
}

export default withMethods(["DELETE", "PATCH"], handler);
