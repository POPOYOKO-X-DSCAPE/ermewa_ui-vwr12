import { getExtensionFromMimeType } from '../helpers/mime-types-mapping';

interface ProcessedFile {
  fileName: string;
  fileContent: string; // base64 string sans préfixe data:
  encoding: "base64";
  mimeType: string;
  ext: string;
}

export async function fetchAndProcessDocument(pdfUrl: string): Promise<ProcessedFile> {
  // 1. Fetch the file
  const response = await fetch(pdfUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch document: ${response.status} ${response.statusText}`);
  }

  // 2. Get Blob from response
  const blob = await response.blob();

  // 3. Try to get mimeType from Blob or fallback to "application/octet-stream"
  const mimeType = blob.type || "application/octet-stream";

  // 4. Determine extension from mimeType, fallback to ".bin"
  const ext = getExtensionFromMimeType(mimeType) || ".bin";

  // 5. Build a File instance to get a fileName (use URL filename or default)
  let fileName = `document${ext}`;
  try {
    const urlObj = new URL(pdfUrl);
    const pathSegments = urlObj.pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment) {
      // Ensure filename has the right extension (replace if different)
      const nameWithoutExt = lastSegment.replace(/\.[^.]+$/, "");
      fileName = nameWithoutExt + ext;
    }
  } catch {
    // ignore URL parse errors and keep default fileName
  }

  const file = new File([blob], fileName, { type: mimeType });

  // 6. Read the file as base64
  const fileContent = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the "data:*/*;base64," prefix
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });

  return {
    fileName,
    fileContent,
    encoding: "base64",
    mimeType,
    ext,
  };
}
