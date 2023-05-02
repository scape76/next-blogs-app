import * as React from "react";

interface HeaderBlockProps {
  data: {
    text: string;
    level: number;
  };
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({ data }) => {
  const { level, text } = data;

  if (level < 1 || level > 6) {
    return null; 
  }

  const Header = `h${level}` as keyof JSX.IntrinsicElements;

  return React.createElement(Header, null, text);
};

export default HeaderBlock;
