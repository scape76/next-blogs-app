import { Block } from "@/types/content";
import { FC } from "react";

import ImageBlock from "@/components/blocks/image-block";
import HeaderBlock from "./blocks/header-block";
import ParagraphBlock from "./blocks/paragraph-block";

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
    default:
      return <></>;
  }
};

export default BlockItem;
