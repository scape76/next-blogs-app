import 'server-only';

import S3 from "aws-sdk/clients/s3";
import { S3Client } from "@aws-sdk/client-s3";

export let s3;

if (process.env.ENV === "DEV") {
  s3 = new S3Client({
    region: "eu-central-1",
    endpoint: "http://localhost:9000",
    forcePathStyle: true,
    credentials: {
      accessKeyId: "S3RVER",
      secretAccessKey: "S3RVER",
    },
  });
} else {
  s3 = new S3({
    region: "eu-central-1",
    accessKeyId: process.env.AWS3_ACCESS,
    secretAccessKey: process.env.AWS3_SECRET,
    signatureVersion: "v4",
  });
}
