import { Block } from "@/types/content";
import { FC } from "react";

import ImageBlock from "@/components/blocks/image-block";
import HeaderBlock from "@/components/blocks/header-block";
import ParagraphBlock from "@/components/blocks/paragraph-block";
import TableBlock from "@/components/blocks/table-block"

interface BlockItemProps {
  block: Block;
}

const BlockItem: FC<BlockItemProps> = ({ block }) => {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlock data={block.data} />;
    case "header":
      return <HeaderBlock data={block.data} />;
    case "image":
      return <ImageBlock data={block.data} />;
    case "table":
      return <TableBlock data={block.data} />;
    default:
      return <></>;
  }
};

export default BlockItem;
