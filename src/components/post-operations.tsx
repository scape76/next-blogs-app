"use client";

import * as React from "react";
import { Actions, Post, User } from "@prisma/client";
import { Icons } from "@/components/icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as z from "zod";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import TranslatedText from "@/components/translation/translated-text";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

async function deletePost(postId: Post["id"]) {
  return await axios.delete(`/api/posts/${postId}`);
}

async function togglePostState(
  postId: Post["id"],
  action: "archive" | "publish"
) {
  return await axios.patch(`/api/posts/${postId}/${action}`);
}

async function addCollaborator(
  postId: Post["id"],
  collaboratorEmail: User["email"]
) {
  return await axios.put(`/api/posts/${postId}`, {
    collaboratorEmail,
  });
}

interface PostOperationsProps {
  post: Pick<Post, "id" | "published"> & { permissions?: Actions[] | null };
}

function PostOperations({ post }: PostOperationsProps) {
  const [showAddCollaboratorAlert, setShowAddCollaboratorAlert] =
    React.useState<boolean>(false);
  const [emailValue, setEmailValue] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deletePost(post.id);
      router.refresh();
      toast({
        title: "Success.",
        description: "Your post was successfully deleted.",
      });
    } catch (err) {
      if (err instanceof axios.AxiosError)
        toast({
          title: "Something went wrong.",
          description: err.response?.data,
          variant: "destructive",
        });
      else
        toast({
          title: "Something went wrong.",
          description: "Your post was not deleted. Please, try again later.",
          variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Icons.spinner />;
  }

  return (
    <>
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
              <TranslatedText tPath="buttons.edit" />
            </DropdownMenuItem>
          </Link>
          {post.permissions?.includes(Actions.MANAGE_STATE) && (
            <>
              <DropdownMenuSeparator />
              <ManageStateOperations
                isPublished={post.published}
                setIsLoading={setIsLoading}
                postId={post.id}
              />
            </>
          )}
          {post.permissions?.includes(Actions.ADD_COLLABORATOR) && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowAddCollaboratorAlert(true)}
              >
                <Icons.addUser className="w-4 h-4 " />
                <TranslatedText tPath="post.add-collaborator" />
              </DropdownMenuItem>
            </>
          )}
          {post.permissions?.includes(Actions.DELETE) && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive focus:text-destructive"
              >
                <Icons.trash className="w-4 h-4 " />
                <TranslatedText tPath="buttons.delete" />
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog
        open={showAddCollaboratorAlert}
        onOpenChange={setShowAddCollaboratorAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Type in your collaborator email</AlertDialogTitle>
            <AlertDialogDescription>
              <input
                type="email"
                className="w-full p-2 text-foreground bg-background rounded focus:outline-none border border-border focus:ring-1"
                onChange={(e) => setEmailValue(e.target.value)}
                value={emailValue}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                setIsLoading(true);
                try {
                  await addCollaborator(post.id, emailValue);
                  toast({
                    title: "Success",
                    description: "Collaborator successfully added",
                    variant: "success",
                  });
                } catch (err) {
                  if (Array.isArray(err.response.data)) {
                    toast({
                      title: "Something went wrong.",
                      description: err.response.data
                        .map((err: z.ZodError) => err.message)
                        .join(", "),
                      variant: "destructive",
                    });
                  } else {
                    toast({
                      title: "Something went wrong. asd",
                      description: err.response.data,
                      variant: "destructive",
                    });
                  }
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const ManageStateOperations = ({
  isPublished,
  setIsLoading,
  postId,
}: {
  isPublished: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  postId: Post["id"];
}) => {
  const router = useRouter();

  const toggleState = async (action: "archive" | "publish") => {
    setIsLoading(true);
    const actionName = action === "archive" ? "archived" : "published";
    try {
      const published = await togglePostState(postId, action);
      if (published) {
        toast({
          title: "Success.",
          description: `Your post was successfully ${actionName}.`,
        });
        router.refresh();
      }
    } catch (err) {
      toast({
        title: "Something went wrong.",
        description: `Your post was not ${actionName}. Please, try again later.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isPublished ? (
        <DropdownMenuItem onClick={() => toggleState("archive")}>
          <Icons.archive className="w-4 h-4" />
          <TranslatedText tPath="buttons.archive" />
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem onClick={() => toggleState("publish")}>
          <Icons.publish className="w-4 h-4 " />
          <TranslatedText tPath="buttons.publish" />
        </DropdownMenuItem>
      )}
    </>
  );
};

export default PostOperations;
