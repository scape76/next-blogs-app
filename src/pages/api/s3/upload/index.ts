import { withMethods } from "@/lib/api-middlewares/with-methods";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseForm } from "@/lib/parse-form";
import { s3 } from "@/lib/s3";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<
    | {
        success: 1;
        file: {
          url: string;
          uploadUrl: string;
        };
      }
    | { success: 0 }
  >
) => {
  try {
    const { name, type } = req.body;

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

    res.json({ success: 1, file: { url, uploadUrl } });
  } catch (err) {
    res.status(err.status).json({ success: 0 });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

export default withMethods(["POST"], handler);
