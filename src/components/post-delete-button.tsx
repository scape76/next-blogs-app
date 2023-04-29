"use client";

import * as React from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Icons } from "@/components/icons";

interface PostDeleteButton {
  id: Post["id"];
}

async function deletePost(postId: Post["id"]) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log("Something went wrong");
    return false;
  }

  return true;
}
const PostDeleteButton: React.FC<PostDeleteButton> = ({ id }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const deleted = await deletePost(id);
      if (deleted) {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Icons.spinner />
      ) : (
        <Icons.trash
          onClick={handleDelete}
          className="text-red-500 w-4 h-4 cursor-pointer"
        />
      )}
    </>
  );
};

export default PostDeleteButton;
