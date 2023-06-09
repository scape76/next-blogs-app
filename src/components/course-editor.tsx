"use client";

import * as React from "react";
import { Course } from "@prisma/client";
import axios from "axios";

import { Input } from "@/components/ui/input";
import Button from "./ui/Button";
import EditorHeader from "./editor-header";
import EditorShell from "./editor-shell";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/getImageUrl";

interface CourseEditorProps {
  course: Pick<Course, "id" | "imageId" | "title">;
}

const CourseEditor: React.FC<CourseEditorProps> = ({ course }) => {
  const [isEditingTitle, setIsEditingTitle] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>(course.title);
  const [isUploading, setIsUploading] = React.useState(false);

  const [file, setFile] = React.useState<File | null>(null);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    if (!file) return;

    const { data } = await axios.post("/api/s3/upload", {
      name: file.name,
      type: file.type,
    });

    console.log(data);

    await Promise.all([
      axios.put(data.file.uploadUrl, file, {
        headers: {
          "Content-type": file.type,
          "Access-Control-Allow-Origin": "*",
        },
      }),
      axios.patch(`/api/courses/${course.id}`, {
        imageId: data.file.imageId,
      }),
    ]);

    router.refresh();

    setFile(null);
    setIsUploading(false);
  };

  return (
    <>
      <EditorHeader isPublished={true} isSaving={false} />
      <EditorShell className="mb-10">
        <h2>Name you course</h2>
        <div className="flex gap-4">
          <Input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            readOnly={!isEditingTitle}
            className="w-3/5"
          />
          {!isEditingTitle ? (
            <Button
              className="px-2 py-2"
              onClick={() => {
                setIsEditingTitle(true);
                inputRef.current?.focus();
              }}
            >
              <Icons.edit />
            </Button>
          ) : (
            <>
              <Button
                className="px-2 py-2"
                onClick={async () => {
                  try {
                    await axios.patch(`/api/courses/${course.id}`, {
                      title,
                    });

                    setIsEditingTitle(false);

                    router.refresh();
                  } catch (err) {}
                }}
              >
                <Icons.save className="text-green-700" />
              </Button>
            </>
          )}
        </div>
        {course.imageId && (
          <img alt="image of the course" src={getImageUrl(course.imageId)} className="max-w-[60%]"/>
        )}
        <form onSubmit={uploadImage}>
          <label
            htmlFor="input-file"
            className="w-full block border border-border rounded p-2 mt-4 cursor-pointer"
          >
            {!course.imageId ? "Set course image" : "Change course image"}
          </label>
          <Input
            id="input-file"
            type="file"
            className="hidden"
            onChange={(event) => setFile(event.target.files![0])}
          />
          <Button
            disabled={!file || isUploading}
            type="submit"
            variant="ghost"
            className="w-full mt-4"
          >
            {isUploading ? "Uploading..." : "Upload image"}
          </Button>
        </form>
      </EditorShell>
    </>
  );
};

export default CourseEditor;
