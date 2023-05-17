"use client";

import * as React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Actions } from "@prisma/client";

interface PermissionItemProps {
  isChecked: boolean;
  action: Actions;
  setPermissions: React.Dispatch<React.SetStateAction<Actions[]>>;
}

// action.split("_").join(" ").toLowerCase()
// permissions.includes(action)

const PermissionItem: React.FC<PermissionItemProps> = ({
  action,
  isChecked,
  setPermissions,
}) => {
  return (
    <DropdownMenuItem
      className="flex items-center gap-x-2 flex-1 focus:border focus:border-border"
      onClick={() =>
        setPermissions((prev) => {
          if (isChecked) {
            return prev.filter((a) => a != action);
          }
          return [...prev, action];
        })
      }
      onSelect={(event: Event) => event.preventDefault()}
    >
      <input
        id={`input-${action}`}
        type="checkbox"
        // className="focus:border focus:border-border"
        checked={isChecked}
      />
      <span>
        {action.split("_").join(" ").toLowerCase()}
      </span>
    </DropdownMenuItem>
  );
};

export default PermissionItem;
