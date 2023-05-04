import * as React from "react";

import type { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface DropdownProps {
  items: {
    icon: JSX.Element;
    content: string;
    onClick: () => void;
  }[];
  isVisible: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ items, isVisible }) => {
  return (
    <div
      className={cn(
        "absolute top-8 right-0 p-2 flex flex-col gap-y-2 flex-1 rounded border border-accent",
        {
          hidden: !isVisible,
        }
      )}
    >
      {items.map(({ icon, onClick, content }, indx) => (
        <span
          key={`${indx}-${content}`}
          className="flex items-center gap-x-2 p-2 hover:bg-accent cursor-pointer rounded"
          onClick={onClick}
        >
          {icon}
          {content}
        </span>
      ))}
    </div>
  );
};

export default Dropdown;
