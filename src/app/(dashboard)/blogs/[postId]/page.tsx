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

  const data = Object.assign(new Content(), post?.content);
  const postData = { title: post?.title, data };

  return postData;
}

const page = async ({ params }: pageProps) => {
  const postData = await getPostData(params.postId);

  return (
    <div>
      <h1 className="text-5xl font-bold focus:outline-none text-[#44403c]">
        {postData.title}
      </h1>
      <div className="mt-4">
        {postData.data.blocks?.length ? (
          postData.data.blocks?.map((block) => (
            <BlockItem key={block.id} block={block} />
          ))
        ) : (
          <p className="text-lg">Nothing to show here...</p>
        )}
      </div>
    </div>
  );
};

export default page;
