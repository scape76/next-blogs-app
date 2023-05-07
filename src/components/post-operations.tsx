"use client";

import * as React from "react";
import { Post } from "@prisma/client";
import { Icons } from "@/components/icons";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

async function deletePost(postId: Post["id"]) {
  try {
    await axios.delete(`/api/posts/${postId}`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function publishPost(postId: Post["id"]) {
  try {
    await axios.patch(`/api/posts/${postId}/publish`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function archivePost(postId: Post["id"]) {
  try {
    await axios.patch(`/api/posts/${postId}/archive`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
interface PostOperationsProps {
  post: Pick<Post, "id" | "published">;
}

function PostOperations({ post }: PostOperationsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const deleted = await deletePost(post.id);
      if (deleted) {
        router.refresh();
      }
      toast({
        title: "Success.",
        description: "Your post was successfully deleted.",
      });
    } catch (err) {
      toast({
        title: "Something went wrong.",
        description: "Your post was not deleted. Please, try again later.",
        variant: "destructive",
      });
    }
  };

  const handlePublish = async () => {
    console.log("hello there");
    try {
      const published = await publishPost(post.id);
      console.log(published);
      if (published) {
        toast({
          title: "Success.",
          description: "Your post was successfully published.",
        });
        router.refresh();
      }
    } catch (err) {
      toast({
        title: "Something went wrong.",
        description: "Your post was not published. Please, try again later.",
        variant: "destructive",
      });
    }
  };

  const handleArchive = async () => {
    try {
      const archived = await archivePost(post.id);
      console.log(archived);
      if (archived) {
        toast({
          title: "Success.",
          description: "Your post was successfully archived.",
        });
        router.refresh();
      }
    } catch (err) {
      toast({
        title: "Something went wrong.",
        description: "Your post was not archived. Please, try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icons.more className="w-4 h-4 cursor-pointer" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        // className="bg-popover p-2 border rounded border-border"
      >
        <Link href={`/editor/${post.id}`}>
          <DropdownMenuItem>
            <Icons.pen className="w-4 h-4" />
            Edit
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {post.published ? (
          <DropdownMenuItem onClick={handleArchive}>
            <Icons.archive className="w-4 h-4" />
            Archive
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handlePublish}>
            <Icons.publish className="w-4 h-4 " />
            Publish
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDelete}
          className="text-destructive focus:text-destructive"
        >
          <Icons.trash className="w-4 h-4 " />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PostOperations;
