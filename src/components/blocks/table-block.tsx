import * as React from "react";

interface TableBlockProps {
  data: {
    withHeadings: boolean;
    content: string[][];
  };
}

const TableBlock: React.FC<TableBlockProps> = ({}) => {
  return <div>TableBlock</div>;
};

export default TableBlock;
