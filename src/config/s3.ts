import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

const s3Config = new S3Client({
  region: process.env.AWS_DEFAULT_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "accessKeyId",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "secretAccessKey",
  },
});

export default s3Config;
