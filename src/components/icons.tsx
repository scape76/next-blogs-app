import * as React from "react";

import {
  ChevronLeft,
  Settings,
  FileText,
  Trash2,
  Loader2,
  MoreVertical,
  FileUp,
  FileDown,
  Moon,
  Sun,
  Laptop,
  Pen,
  User,
  UserPlus,
  Users,
  type Icon as LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type Icon = LucideIcon;

const Spinner = React.forwardRef<
  React.ComponentRef<typeof Loader2>,
  React.ComponentPropsWithoutRef<typeof Loader2> & {
    animate?: boolean;
  }
>(({ className, animate = true }, ref) => (
  <Loader2
    ref={ref}
    className={cn("w-4 h-4", { "animate-spin": animate }, className)}
  />
));

Spinner.displayName = "Spinner";

export const Icons = {
  post: FileText,
  settings: Settings,
  trash: Trash2,
  spinner: Spinner,
  chevronLeft: ChevronLeft,
  publish: FileUp,
  archive: FileDown,
  moon: Moon,
  sun: Sun,
  laptop: Laptop,
  more: MoreVertical,
  pen: Pen,
  user: User,
  addUser: UserPlus,
  group: Users,
};
