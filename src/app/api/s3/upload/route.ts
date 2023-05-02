import * as z from "zod";
import { s3 } from "@/lib/s3";

const fileUploadSchema = z.object({
  name: z.string(),
  type: z.string(),
});

export async function POST(req: Request, res: Response) {
  try {
    const json = await req.json();
    const { name, type } = fileUploadSchema.parse(json);


    const getUniquePrefix = `${Date.now()}-${Math.random() * 1e9}`;
    const filename = `${getUniquePrefix}-${name}`;

    const fileParams = {
      Bucket: process.env.AWS3_BUCKET_NAME,
      Key: filename,
      Expires: 600,
      ContentType: type,
      ACL: "public-read",
    };

    const uploadUrl = await s3.getSignedUrlPromise("putObject", fileParams);
    const url = process.env.AWS3_URL + filename;

    return new Response(
      JSON.stringify({ success: 1, file: { url, uploadUrl } }),
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
