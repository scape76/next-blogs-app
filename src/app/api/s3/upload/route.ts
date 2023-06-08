import * as z from "zod";
import { s3 } from "@/lib/s3";
import { v4 as uuidv4 } from "uuid";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getImageUrl } from "@/lib/getImageUrl";

const fileUploadSchema = z.object({
  name: z.string(),
  type: z.string(),
});

const UPLOAD_MAX_FILE_SIZE = 1000000;

export async function POST(req: Request, res: Response) {
  try {
    const json = await req.json();
    const { name, type } = fileUploadSchema.parse(json);

    const imageId = `${uuidv4()}-${name}`;

    let fileParams: any;
    let uploadUrl: string;
    let url: string;
    let fields: any;

    if (process.env.ENV !== "DEV") {
      fileParams = {
        Bucket: process.env.AWS3_BUCKET_NAME,
        Key: imageId,
        Expires: 600,
        ContentType: type,
        ACL: "public-read",
      };

      uploadUrl = await s3.getSignedUrlPromise("putObject", fileParams);
      url = process.env.AWS3_URL + imageId;
    } else {
      fileParams = {
        Bucket: process.env.AWS3_BUCKET_NAME,
        Key: imageId,
        Expires: 600,
        ContentType: type,
        ACL: "public-read",
      };

      ({ url: uploadUrl, fields } = await createPresignedPost(s3, {
        Bucket: process.env.BUCKET_NAME || "",
        Key: imageId,
        Fields: {
          key: imageId,
        },
        Conditions: [
          ["starts-with", "$Content-Type", "image/"],
          ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE],
        ],
      }));
      url = getImageUrl(imageId);
    }

    return new Response(
      JSON.stringify({
        success: 1,
        file: {
          url,
          imageId,
          uploadUrl,
          fields,
          isDev: process.env.ENV === "DEV",
        },
      }),
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify(err.errors), { status: 522 });
    }

    return new Response(JSON.stringify({ success: 0 }), { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};
