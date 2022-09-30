import multer from "multer";
import path from "path";
import crypto from "crypto";
import multerS3 from "multer-s3";
import s3Config from "./s3";
import { unprocessableEntry } from "../utils/errorUtils";

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file: Express.Multer.File & { key: string }, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, "");

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: s3Config,
    bucket: process.env.AWS_BUCKET_NAME || "bucketName",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, "");

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
};

const currentStorageType: string = process.env.MULTER_STORAGE_TYPE || "local";

const multerConfig = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes[currentStorageType as keyof typeof storageTypes],
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );

    const allowedMimes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(unprocessableEntry("Invalid file type uploaded"), undefined);
    }
  },
};

export default multerConfig;
