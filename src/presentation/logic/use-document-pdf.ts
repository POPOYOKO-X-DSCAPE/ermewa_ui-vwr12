import { useEffect, useRef, useState } from "react";
import pdfBase64 from '../../infrastructure/offline-services/file.json';
import services from "../../infrastructure/services";

interface UseDocumentPdfResult {
  pdfUrl: string | null;
  error: string | null;
  loading: boolean;
}

export function useDocumentPdf(
  documentCode: string,
  isOffline = false
): UseDocumentPdfResult {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const pdfUrlRef = useRef<string | null>(null);
  
  useEffect(() => {
    let isCancelled = false;

    const fetchPdf = async () => {
      try {
        let blob: Blob;
        
        if (isOffline) {          
          const base64ToBlob = (base64String: string, mimeType = 'application/pdf'): Blob => {
            const base64Data = base64String.includes(",") ? base64String.split(",")[1] : base64String;
                    
            const byteCharacters = atob(base64Data);
          
            const byteNumbers = new Uint8Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
          
            return new Blob([byteNumbers], { type: mimeType });
          };
          
        
          blob = base64ToBlob(pdfBase64);          
          
        } else {
          await services.vwr.get.document({ params: { documentCode } });
          await services.vwr.get.parameters();

          const response = await services.vwr.post.file({
            params: { documentCode, "7443": ":7443" },
            body: {
              //@ts-ignore <dummy>
              XDOC: {
                [documentCode]: {
                  STATE: 1,
                  URL: "eged://$TBL:406$REF:MNR$FIC:24000249-0002$RCD:8825$LIG:10$",
                  XFILE: {
                    PDF: {
                      LAN: {
                        "": {
                          URLDET:
                            "eged://$TBL:406$REF:MNR$FIC:24000249-0002$RCD:8825$COL:0$LIG:10$LNG:0$EXT:PDF$MODIF:0$",
                          _URLSHO: "eged://$TBL:406$KEY:770$",
                        },
                      },
                    },
                  },
                },
              },
            },
          });          

          //@ts-ignore <typescript technical debt [services]>
          blob = response.data instanceof Blob ? response.data : await response.data.blob();
        }

        const url = URL.createObjectURL(blob);

        if (!isCancelled) {
          pdfUrlRef.current = url;
          setPdfUrl(url);
        }
      } catch (err) {
        console.error("Erreur lors du chargement du PDF :", err);
        if (!isCancelled) {
          setError("Impossible de charger le PDF.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchPdf();

    return () => {
      isCancelled = true;
      if (pdfUrlRef.current) {
        URL.revokeObjectURL(pdfUrlRef.current);
        pdfUrlRef.current = null;
      }
    };
  }, [documentCode, isOffline]);

  return { pdfUrl, error, loading };
}
