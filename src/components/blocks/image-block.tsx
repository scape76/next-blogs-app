import * as React from "react";

interface ImageBlockProps {
  data: {
    file: {
      url: string;
      uploadUrl: string;
    };
    caption?: string;
    stretched: boolean;
    withBorded: boolean;
    withBackgroud: boolean;
  };
}

const ImageBlock: React.FC<ImageBlockProps> = ({ data }) => {
  return (
    <div className="max-w-[650px]">
      <img src={data.file.url} alt={data.caption || 'image'} />
      {data.caption && <div className="w-full p-2 border border-gray-400 text-gray-500">{data.caption}</div>}
    </div>
  );
};

export default ImageBlock;
