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
    withBackground: boolean;
  };
}

const ImageBlock: React.FC<ImageBlockProps> = ({ data }) => {
  return (
    <div>
      {data.withBackground ? (
        <div className="image-tool__image bg-accent p-[15px]">
          <img
            src={data.file.url}
            alt={data.caption || "image"}
            className="mx-auto max-w-[60%]"
          />
        </div>
      ) : (
        <img src={data.file.url} alt={data.caption || "image"} />
      )}
      {/* <img src={data.file.url} alt={data.caption || 'image'} /> */}
      {data.caption && (
        <div className="w-full p-2 border border-border ">{data.caption}</div>
      )}
    </div>
  );
};

export default ImageBlock;
