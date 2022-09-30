import { S3Client } from "@aws-sdk/client-s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

const bucketParams = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: "24b9347ed970aa821a113db910594b0a-Relatório final Natimel.pdf",
};

const s3Config = new S3Client({
  region: process.env.AWS_DEFAULT_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "accessKeyId",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "secretAccessKey",
  },
});

s3Config.send(new DeleteObjectCommand(bucketParams));

export default s3Config;
