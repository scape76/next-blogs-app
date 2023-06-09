import * as z from "zod";
import { s3 } from "@/lib/s3";
import { v4 as uuidv4 } from "uuid";


const fileUploadSchema = z.object({
  name: z.string(),
  type: z.string(),
});

export async function POST(req: Request, res: Response) {
  try {
    const json = await req.json();
    const { name, type } = fileUploadSchema.parse(json);

    const imageId = `${uuidv4()}-${name}`;

    let fileParams: any;
    let uploadUrl: string;
    let url: string;
    let fields: any;

    fileParams = {
      Bucket: process.env.AWS3_BUCKET_NAME,
      Key: imageId,
      Expires: 600,
      ContentType: type,
      ACL: "public-read",
    };

    uploadUrl = await s3.getSignedUrlPromise("putObject", fileParams);
    url = process.env.AWS3_URL + imageId;

    console.log(url);

    return new Response(
      JSON.stringify({
        success: 1,
        file: {
          url,
          imageId,
          uploadUrl,
          fields,
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
