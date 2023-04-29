import { Block } from "@/types/content";
import { FC } from "react";

interface BlockItemProps {
  block: Block;
}

const BlockItem: FC<BlockItemProps> = ({ block }) => {
  if (block.type === "paragraph") {
    return <p className="text-lg text-gray-700">{block.data.text}</p>;
  }
  return <h1 className="font-bold text-4xl">{block.data.text}</h1>;
};

export default BlockItem;
