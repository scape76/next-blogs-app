"use client";

import * as React from "react";
import EditorJS from "@editorjs/editorjs";
import { Post } from "@prisma/client";
import * as z from "zod";
import { useForm } from "react-hook-form";
// import { generateReactHelpers } from "@uploadthing/react";
// import type { OurFileRouter } from "@/app/api/uploadthing/core";

import { zodResolver } from "@hookform/resolvers/zod";
import { postPatchSchema } from "@/lib/validations/post";
import TextareaAutosize from "react-textarea-autosize";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import TranslatedText from "@/components/translation/translated-text";

// const { useUploadThing } = generateReactHelpers<OurFileRouter>();

type FormData = z.infer<typeof postPatchSchema>;

interface PostEditor {
  post: Pick<Post, "id" | "title" | "content" | "published">;
  readOnly: boolean;
}

const PostEditor: React.FC<PostEditor> = ({ post, readOnly }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(postPatchSchema),
  });

  const [isSaving, setIsSaving] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const ref = React.useRef<EditorJS>();

  const router = useRouter();

  // const { startUpload } = useUploadThing("imageUploader");

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const ImageTool = (await import("@editorjs/image")).default;
    // const Image = (await import("@editorjs/image")).default;

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
                uploadByFile: async (file) => {
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
    setIsSaving(true);
    try {
      const blocks = await ref.current?.save();

      await fetch(`/api/posts/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          content: blocks,
        }),
      });
    } catch (err) {
      console.log("Something went wrong");
    } finally {
      setIsSaving(false);
      router.refresh();
    }
  }

  if (!isMounted) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!readOnly && (
        <div className="max-w-5xl mx-auto mt-4 flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => router.back()}>
              <TranslatedText tPath="buttons.go-back" />
            </Button>
            <span className="ml-4 ">
              <TranslatedText
                tPath={`post.${post.published ? "published" : "draft"}`}
              />
            </span>
          </div>
          <Button type="submit" isLoading={isSaving}>
            <TranslatedText tPath="buttons.save" />
          </Button>
        </div>
      )}
      <div className="prose prose-stone mx-auto px-4 pt-2 md:px-0 dark:prose-invert">
        <TextareaAutosize
          autoFocus
          id="title"
          defaultValue={post.title}
          placeholder="Post title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          {...register("title", { minLength: 3, maxLength: 128 })}
          aria-invalid={errors.title ? "true" : "false"}
        />
        {errors.title && (
          <p role="alert" className="text-sm text-destructive">
            {errors.title?.message as string}
          </p>
        )}
        <div id="editor" className="min-h-[500px]" />
      </div>
    </form>
  );
};

export default PostEditor;
