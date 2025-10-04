import services from '../services';

type Attachment = {
  filename: string;
  content: string;
  encoding: string;
};

export type EmailInterface = {
    from: string;
    to: string;
    cc?: string;
    bcc?: string;
    subject: string;
    text?: string;
    html?: string;
    attachments?: Attachment[];
}

// <technical debt: ermi specific>
export type EmailBodyRequest = {
  $ClassName: string;
  $ClassVer: string;
  xMessage: {
    $ClassName: string;
    $ClassVer: string;
    from: string;
    to: string;
    subject: string;
    cc?: string;
    bcc?: string;
    text?: string;
    html?: string;
    attachments?: Attachment[];
  };
};
 
 export const sendMail = async (request: EmailInterface) => {
    const body = {
        $ClassName: "IerXMailer",
        $ClassVer: "12.7",
        xMessage: {
            $ClassName: "IerXMailMessage",
            $ClassVer: "12.7",
            from: request.from,
            to: request.to,
            subject: request.subject,
            ...(request.cc && { cc: request.cc }),
            ...(request.bcc && { bcc: request.bcc }),
            ...(request.text && { text: request.text }),
            ...(request.html && { html: request.html }),
            ...(request.attachments &&
            request.attachments.length > 0 && {
                attachments: request.attachments,
            }),
        },
    } satisfies EmailBodyRequest;

    // @ts-ignore <typescript technical debt [services]>
    const response = await services.common.post.sendMail({ body });

    return response;
};

