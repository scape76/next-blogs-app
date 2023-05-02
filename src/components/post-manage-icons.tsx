"use client";

import * as React from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Icons } from "@/components/icons";
import axios from "axios";

interface PostManageButtons {
  id: Post["id"];
  published: Post["published"];
}

async function deletePost(postId: Post["id"]) {
  const res = await axios.delete(`/api/posts/${postId}`);

  if (res.statusText !== "OK") {
    console.log("something went wrong");
    return false;
  }

  return true;
}

async function publishPost(postId: Post["id"]) {
  const res = await axios.patch(`/api/posts/${postId}/publish`);

  if (res.statusText !== "OK") {
    console.log("something went wrong");
    return false;
  }

  return true;
}

async function archivePost(postId: Post["id"]) {
  const res = await axios.patch(`/api/posts/${postId}/archive`);

  if (res.statusText !== "OK") {
    console.log("something went wrong");
    return false;
  }

  return true;
}

const PostManageButtons: React.FC<PostManageButtons> = ({ id, published }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [isArchiving, setIsArchiving] = React.useState(false);
  
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const deleted = await deletePost(id);
      if (deleted) {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const published = await publishPost(id);
      if (published) {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleArchive = async () => {
    setIsArchiving(true);
    try {
      const archived = await archivePost(id);
      if (archived) {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsArchiving(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      {}
      {published ? (
        isArchiving ? 
        <Icons.spinner/> :
        <Icons.archive
          onClick={handleArchive}
          className="text-blue-500 w-4 h-4 cursor-pointer"
        />
      ) : (
        isPublishing ? 
        <Icons.spinner/> :
        <Icons.publish
          onClick={handlePublish}
          className="text-blue-500 w-4 h-4 cursor-pointer"
        />
      )}
      {isDeleting ? (
        <Icons.spinner />
      ) : (
        <Icons.trash
          onClick={handleDelete}
          className="text-red-500 w-4 h-4 cursor-pointer"
        />
      )}
    </div>
  );
};

export default PostManageButtons;
