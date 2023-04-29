import { FC } from "react";
import type { Post } from "@prisma/client";
import { db } from "@/lib/db";
import { Content } from "@/types/content.d";

import BlockItem from "@/components/block-item";

interface pageProps {
  params: {
    postId: Post["id"];
  };
}

async function getPostData(id: Post["id"]) {
  const post = await db.post.findFirst({
    where: {
      id,
    },
  });

  const postData = Object.assign(new Content(), post?.content);

  return postData;
}

const page = async ({ params }: pageProps) => {
  const data = await getPostData(params.postId);

  return (
    <div>
      {data.blocks?.length ? (
        data.blocks?.map((block) => <BlockItem key={block.id} block={block} />)
      ) : (
        <p className="text-lg text-gray-400">Nothing to show here...</p>
      )}
    </div>
  );
};

export default page;
