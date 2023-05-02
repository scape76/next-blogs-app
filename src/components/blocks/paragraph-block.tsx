import * as React from "react";

interface ParagraphBlockProps {
  data: {
    text: string;
  };
}

const ParagraphBlock: React.FC<ParagraphBlockProps> = ({ data }) => {
  return <div className="leading-[1.6em]">{data.text}</div>;
};

export default ParagraphBlock;
