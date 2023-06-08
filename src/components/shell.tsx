import { cn } from "@/lib/utils";
import * as React from "react";

interface DashboradShellProps extends React.HTMLAttributes<HTMLDivElement> {}

const DashboardShell: React.FC<DashboradShellProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  );
};

export default DashboardShell;
