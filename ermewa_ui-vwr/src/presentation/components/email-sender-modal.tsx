import * as Ariakit from "@ariakit/react";

import { Stack } from "@packages/ui/abstract/stack";
import { Button } from "@packages/ui/components/button";
import { Dialog } from "@packages/ui/components/dialog";
import { Input } from "@packages/ui/components/form/input";
import classNames from "classnames";
import { css } from "../../../styled-system/css";
import type { EmailInterface } from "../../infrastructure/helpers/send-mail";

interface EmailSenderModalProps {
  initialEmail: EmailInterface;
  onSend: (email: EmailInterface) => void;
  onClose: () => void;
  labels?: {
    title: string;
    from: string;
    to: string;
    cc: string;
    bcc: string;
    subject: string;
    body: string;
    send: string;
    cancel: string;
  };
}

const formStyle = css({
  gap: "s.padding.s",
});

const buttonsStyle = css({
  gap: "s.padding.s",
});

export const EmailSenderModal = ({
  initialEmail,
  onSend,
  onClose,
  labels,
}: EmailSenderModalProps) => {
  const form = Ariakit.useFormStore({
    defaultValues: {
      from: "",
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      message: "",
    },
  });

  form.useSubmit(async (state) => {
    alert(JSON.stringify(state.values));
  });

  const handleSend = () => {
    onSend(form.names.from as unknown as EmailInterface);
  };

  return (
    <Dialog
      closeButtonContent={"Cancel"}
      onClose={() => onClose()}
      isOpen={true}
    >
      <Stack>
        <h2 style={{ marginBottom: "24px", fontSize: "20px", fontWeight: 600 }}>
          {labels?.title || "Envoyer un Email"}
        </h2>
        <Ariakit.Form
          store={form}
          aria-labelledby="send-via-email"
          // @ts-ignore <The children are already defined by parent component>
          render={<Stack />}
          className={classNames(formStyle)}
        >
          <Input form={form} name={"from"} label={labels?.from || "From"} />
          <Input form={form} name={"to"} label={labels?.to || "To"} />
          <Input form={form} name={"cc"} label={labels?.cc || "CC"} />
          <Input form={form} name={"bcc"} label={labels?.bcc || "BCC"} />
          <Input
            type="textarea"
            form={form}
            name={"subject"}
            label={labels?.subject || "Subject"}
          />
          <Input
            type="textarea"
            form={form}
            name={"message"}
            label={labels?.body || "Message"}
          />
          <Stack
            direction="row"
            justifyContent="end"
            className={classNames(buttonsStyle)}
          >
            <Button onClick={onClose}>{labels?.cancel || "Cancel"}</Button>
            <Button onClick={handleSend}>{labels?.send || "Send"}</Button>
          </Stack>
        </Ariakit.Form>
      </Stack>
    </Dialog>
  );
};

export default EmailSenderModal;
