import { useCallback, useMemo, useState } from "react";
import type { JSX } from "react";
import type { EmailInterface } from "../../interface-adapters/external-types/email";
import { fetchAndProcessDocument } from "../../infrastructure/helpers/fetch-and-process-document";
import services from "../../infrastructure/services";
import { useAppContext } from "../common/app-context";
import { EmailSenderModal } from "../components/email-sender-modal";

type FooterAction = {
  id: string;
  label: string;
  hidden: boolean;
  onClick: () => void;
  renderModal?: () => JSX.Element | null;
}

function useEmailModal(documentCode: string) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const send = useCallback(async (email: EmailInterface) => {
    try {
      // @ts-ignore <typescript technical debt [services]>
      await services.common.post.sendMail({ body: email });
    } catch (e) {
      console.error("::SendMail error", e);
    }
    setIsOpen(false);
  }, []);

  const initialEmail = useMemo<EmailInterface>(() => ({
    from: "",
    to: "",
    cc: "",
    bcc: "",
    subject: `Document ${documentCode}`,
    text: `Test: ${documentCode}`,
    attachments: [],
  }), [documentCode]);

  const modal = useMemo(() => {
    if (!isOpen) return null;
    return (
      <EmailSenderModal
        initialEmail={initialEmail}
        onSend={send}
        onClose={close}
      />
    );
  }, [isOpen, initialEmail, send, close]);

  return { open, close, send, modal, isOpen };
}

export function useFooterActions(
  pdfUrl: string | null,
  documentCode: string
): FooterAction[] {
  const { appProfile } = useAppContext();

  const handleCopy = useCallback(async () => {
    if (!pdfUrl) return;
    try {
      const body = await fetchAndProcessDocument(pdfUrl);
      // @ts-ignore <typescript technical debt [services]>
      await services.local.post.clipboard({ body });
      console.log(`::Clipboard: "${body.fileName}" copié avec succès.`);
    } catch (err) {
      console.error("::Clipboard Error:", err);
    }
  }, [pdfUrl]);

  const handleDownload = useCallback(() => {
    if (pdfUrl) {
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = `${documentCode}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // cleanup
    }
  }, [pdfUrl, documentCode]);

  const { open: openEmail, modal: emailModal } = useEmailModal(documentCode);

  const actions = useMemo<FooterAction[]>(() => [
    {
      id: "copy",
      label: "Copier",
      onClick: handleCopy,
      hidden: !appProfile?.app.permissions.canCopy,
    },
    {
      id: "download",
      label: "Télécharger",
      onClick: handleDownload,
      hidden: !appProfile?.app.permissions.canDownload,
    },
    {
      id: "email",
      label: "Courriel",
      hidden: !appProfile?.app.permissions.canMail,
      onClick: openEmail,
      renderModal: () => emailModal,
    },
  ], [
    handleCopy,
    handleDownload,
    openEmail,
    emailModal,
    appProfile?.app.permissions,
  ]);

  return actions;
}
