import "server-only";

import S3 from "aws-sdk/clients/s3";

export const s3 = new S3({
  region: "eu-central-1",
  accessKeyId: process.env.AWS3_ACCESS,
  secretAccessKey: process.env.AWS3_SECRET,
  signatureVersion: "v4",
});
