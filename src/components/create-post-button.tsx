"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";

interface CreatePostButton {}

const CreatePostButton: React.FC<CreatePostButton> = ({}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const handleCreate = async () => {
    setIsLoading(true);
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    });

    if (!response?.ok) {
      console.log("Something went wrong");
    }

    setIsLoading(false);

    const post = await response.json();

    router.push(`/editor/${post.id}`);
  };

  return (
    <Button isLoading={isLoading} onClick={handleCreate} variant="ghost">
      Create
    </Button>
  );
};

export default CreatePostButton;
