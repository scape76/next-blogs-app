import * as React from "react";
import { cn } from "@/lib/utils";

interface EditorShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const EditorShell: React.FC<EditorShellProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "prose prose-stone mx-auto px-4 pt-2 md:px-0 dark:prose-invert",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default EditorShell;
