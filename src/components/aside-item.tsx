import { FC } from "react";
import type { Icon } from "@/components/icons";

import Link from "next/link";
import TranslatedText from "@/components/translation/translated-text";

interface AsideItemProps {
  tPath: string;
  Icon: Icon;
  path: string;
}

const AsideItem: FC<AsideItemProps> = ({ tPath, Icon, path }) => {
  return (
    <Link href={path}>
      <div className="flex items-center p-2 gap-x-2 text-sm rounded cursor-pointer hover:bg-accent">
        <Icon className="w-4 h-4" />
        <span className="text-md font-semibold">
          <TranslatedText tPath={tPath} />
        </span>
      </div>
    </Link>
  );
};

export default AsideItem;
