import {
  ChevronLeft,
  Settings,
  FileText,
  Trash2,
  Loader2,
  MoreVertical,
  FileUp,
  FileDown,
  type Icon as LucideIcon,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  post: FileText,
  settings: Settings,
  ellipsis: MoreVertical,
  trash: Trash2,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  publish: FileUp,
  archive: FileDown
};
