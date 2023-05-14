"use client";
import * as React from "react";
import { Icons } from "@/components/icons";
import { Actions, Collaborator, Post } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import PermissionItem from "@/components/permission-item";

import Button from "@/components/ui/Button";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface permissionsToggleProps {
  initialPermissions: Actions[];
  postId: Post["id"];
  collaboratorId: Collaborator["id"];
}

const permissionsToggle: React.FC<permissionsToggleProps> = ({
  initialPermissions,
  postId,
  collaboratorId,
}) => {
  const possibleActions: Actions[] = Object.values<Actions>(Actions);
  const [permissions, setPermissions] = React.useState(initialPermissions);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter();

  if (isLoading) {
    return <Icons.spinner />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icons.more className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {possibleActions.map((action) => (
          <PermissionItem
            key={action}
            action={action}
            isChecked={permissions.includes(action)}
            setPermissions={setPermissions}
          />
        ))}
        <DropdownMenuSeparator />
        <Button
          className="w-full"
          variant="ghost"
          onClick={async () => {
            setIsLoading(true);
            try {
              await axios.patch(
                `/api/posts/${postId}/collaborators/${collaboratorId}`,
                {
                  permissions,
                }
              );
              toast({
                title: "Success.",
                description: "Permissions were updated successfully",
                variant: "success",
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
                  description:
                    "Your post was not created. Please, try again later.",
                  variant: "destructive",
                });
            } finally {
              setIsLoading(false);
              router.refresh();
            }
          }}
        >
          Save
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default permissionsToggle;
