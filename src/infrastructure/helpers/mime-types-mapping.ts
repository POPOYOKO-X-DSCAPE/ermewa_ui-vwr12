const mimeTypeMapping: { [extension: string]: string } = {
  // Application Types
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".odt": "application/vnd.oasis.opendocument.text",
  ".ods": "application/vnd.oasis.opendocument.spreadsheet",
  ".zip": "application/zip",
  ".rar": "application/vnd.rar",
  ".7z": "application/x-7z-compressed",
  ".tar": "application/x-tar",
  ".gz": "application/gzip",
  ".bz2": "application/x-bzip2",
  ".json": "application/json",
  ".xml": "application/xml",
  ".csv": "text/csv",
  ".exe": "application/octet-stream",
  ".bin": "application/octet-stream",
  ".dll": "application/octet-stream",
  ".deb": "application/vnd.debian.binary-package",
  ".dmg": "application/x-apple-diskimage",
  ".iso": "application/x-iso9660-image",
  ".apk": "application/vnd.android.package-archive",
  ".msi": "application/x-msdownload",
  ".msg": "application/vnd.ms-outlook",

  // Image Types
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".bmp": "image/bmp",
  ".tiff": "image/tiff",
  ".webp": "image/webp",
  ".ico": "image/vnd.microsoft.icon",
  ".svg": "image/svg+xml",
  ".psd": "image/vnd.adobe.photoshop",

  // Audio Types
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".flac": "audio/flac",
  ".aac": "audio/aac",
  ".m4a": "audio/mp4",
  ".wma": "audio/x-ms-wma",
  ".aiff": "audio/aiff",
  ".mid": "audio/midi",
  ".midi": "audio/midi",

  // Video Types
  ".mp4": "video/mp4",
  ".avi": "video/x-msvideo",
  ".mkv": "video/x-matroska",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".wmv": "video/x-ms-wmv",
  ".flv": "video/x-flv",
  ".mpeg": "video/mpeg",
  ".mpg": "video/mpeg",
  ".3gp": "video/3gpp",
  ".3g2": "video/3gpp2",

  // Text Types
  ".txt": "text/plain",
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".ts": "application/typescript",
  ".jsx": "application/javascript",
  ".tsx": "application/typescript",
  ".md": "text/markdown",
  ".rtf": "application/rtf",
  ".log": "text/plain",

  // Font Types
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".eot": "application/vnd.ms-fontobject",
};

const invertedMimeTypeMapping: { [mimeType: string]: string } = Object.entries(mimeTypeMapping).reduce(
  (acc, [ext, mime]) => {
    acc[mime] = ext;
    return acc;
  },
  {} as { [mimeType: string]: string }
);

export function getMimeTypeFromExtension(extension: string): string | undefined {
  const ext = extension.startsWith(".") ? extension : `.${extension}`;
  return mimeTypeMapping[ext];
}

export function getExtensionFromMimeType(mimeType: string): string | undefined {
  return invertedMimeTypeMapping[mimeType];
}
