import { useDocumentPdf } from "./use-document-pdf";

export function useDocument(documentCode: string, isOffline: boolean) {
  const { pdfUrl, error, loading } = useDocumentPdf(documentCode, isOffline);

  if (pdfUrl) {
    return {
      url: pdfUrl,
      type: "pdf" as const,
      error,
      loading,
    };
  }

  return {
    url: null,
    type: "unknown" as const,
    error,
    loading,
  };
}
