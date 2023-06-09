"use client";

import * as React from "react";
import { cache } from "react";
import axios from "axios";
import EditorJS from "@editorjs/editorjs";
import { Post } from "@prisma/client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import "@/styles/editor.css";
import { postPatchSchema } from "@/lib/validations/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import TextareaAutosize from "react-textarea-autosize";
import { toast } from "@/components/ui/use-toast";
import EditorHeader from "@/components/editor-header";
import EditorShell from "@/components/editor-shell";

// if a user uploads the same file
// i want it to return the same link of the
// image before

type FormData = z.infer<typeof postPatchSchema>;

interface PostEditor {
  post: Pick<Post, "id" | "title" | "content" | "published">;
  readOnly: boolean;
}

const PostEditor = ({ post, readOnly }: PostEditor) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(postPatchSchema),
  });

  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const ref = React.useRef<EditorJS>();

  const router = useRouter();

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    const body = postPatchSchema.parse(post);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: !readOnly && "Write an amazing story",
        inlineToolbar: true,
        data: body.content,
        readOnly,
        tools: {
          header: Header,
          embed: Embed,
          table: Table,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: async (file: File) => {
                  const { data } = await axios.post("/api/s3/upload", {
                    name: file.name,
                    type: file.type,
                  });

                  await axios.put(data.file.uploadUrl, file, {
                    headers: {
                      "Content-type": file.type,
                      "Access-Control-Allow-Origin": "*",
                    },
                  });

                  return data;
                },
              },
            },
          },
        },
        autofocus: true,
      });
    }
  }, [post, readOnly]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: FormData) {
    console.log("saving");
    setIsSaving(true);
    try {
      const blocks = await ref.current?.save();

      await axios.patch(`/api/posts/${post.id}`, {
        title: data.title,
        content: blocks,
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
          title: "Something went wrong.",
          description: err.response.data,
          variant: "destructive",
        });
      }
    } finally {
      setIsSaving(false);
      router.refresh();
    }
  }

  if (!isMounted) {
    return null;
  }

  console.log(errors.title?.message);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!readOnly && (
        <EditorHeader isSaving={isSaving} isPublished={post.published} />
      )}
      <EditorShell>
        <TextareaAutosize
          autoFocus
          id="title"
          defaultValue={post.title}
          placeholder="Post title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          {...register("title", { minLength: 3, maxLength: 128 })}
          aria-invalid={errors.title ? "true" : "false"}
          readOnly={readOnly}
        />
        {errors.title && (
          <p role="alert" className="text-sm text-destructive">
            {errors.title?.message as string}
          </p>
        )}
        <div id="editor" />
      </EditorShell>
    </form>
  );
};

// PostEditor.Skeleton = function PostEditorSkeleton() {
//   return (
//     <div className="prose prose-stone mx-auto px-4 pt-2 md:px-0 dark:prose-invert">
//       <Skeleton className="w-2/4 h-8" />
//       <Skeleton className="w-full h-4xl" />
//     </div>
//   );
// };

export default PostEditor;
