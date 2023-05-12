"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import TranslatedText from "@/components/translation/translated-text";
import axios from "axios";

import { toast } from "@/components/ui/use-toast";
import Button from "@/components/ui/Button";
import { Post } from "@prisma/client";

interface CreatePostButton {}

const CreatePostButton: React.FC<CreatePostButton> = ({}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post<Pick<Post, "id">>("/api/posts", {
        title: "Untitled Post",
      });

      setIsLoading(false);

      router.push(`/editor/${data.id}`);
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
          description: "Your post was not created. Please, try again later.",
          variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button isLoading={isLoading} onClick={handleCreate} variant="ghost">
      <TranslatedText tPath="buttons.create" />
    </Button>
  );
};

export default CreatePostButton;
