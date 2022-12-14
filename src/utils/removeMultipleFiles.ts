import s3Config from "../config/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { TTestFile } from "../types/fileTestType";
import { TAppointmentFile } from "../types/fileAppointmentType";

export default async function removeMultipleFilesS3(
  files: TTestFile[] | TAppointmentFile[]
) {
  for (let i = 0; i < files.length; i++) {
    const bucketParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: files[i].key,
    };

    await s3Config.send(new DeleteObjectCommand(bucketParams));
  }
}
