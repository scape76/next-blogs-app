import * as React from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import TranslatedText from "@/components/translation/translated-text";

interface EditorHeaderProps {
  isPublished: boolean;
  isSaving: boolean;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  isPublished,
  isSaving,
}) => {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto mt-4 flex items-center justify-between px-4">
      <div>
        <Button variant="ghost" onClick={() => router.back()}>
          <TranslatedText tPath="buttons.go-back" />
        </Button>
        <span className="ml-4 ">
          <TranslatedText
            tPath={`post.${isPublished ? "published" : "draft"}`}
          />
        </span>
      </div>
      <Button type="submit" isLoading={isSaving}>
        <TranslatedText tPath="buttons.save" />
      </Button>
    </div>
  );
};

export default EditorHeader;
