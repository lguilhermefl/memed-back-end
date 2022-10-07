export default function createFileObject(
  uploadedFile: Express.Multer.File & {
    key: string;
    location: string;
    path: string;
  }
) {
  const { originalname: name, size, key } = uploadedFile;

  if (uploadedFile.location) {
    return {
      name,
      key,
      size,
      url: uploadedFile.location,
    };
  }

  return {
    name,
    key,
    size,
    url: uploadedFile.path,
  };
}
