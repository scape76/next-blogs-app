import { FC } from "react";
import type { Icon } from "@/components/icons";

interface AsideItemProps {
  title: string;
  Icon: Icon;
}

const AsideItem: FC<AsideItemProps> = ({ title, Icon }) => {
  return (
    <div className="flex items-center p-2 gap-x-2 text-sm rounded cursor-pointer hover:bg-slate-100">
      <Icon className="w-4 h-4" />
      <span className="text-sm text-gray-700">{title}</span>
    </div>
  );
};

export default AsideItem;
