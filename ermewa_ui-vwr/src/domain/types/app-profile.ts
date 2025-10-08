export type AppProfileInterface = {
  $ClassName: string;
  $ClassVer: string;
  $uid: string;
  $stamp: string;
  headers: {
    login: string;
    uPid: string;
    xEdm: string;
    xPrf: string;
  };
  app: {
    name: Record<string, string>;
    sid: string;
    version: string;
    attributes?: Record<string, unknown>;
    title: string;
    permissions: {
      canCopy: boolean;
      canDownload: boolean;
      canMail: boolean;
    }
  };
  profile: {
    name: Record<string, string>;
    pid: string;
    sid: string;
    parameters: Record<string, unknown>;
    server: {
      [key: string]: {
        parameter: string;
        type: string;
        value: Record<string, unknown>;
      };
    };
  };
  user: {
    app: {
      [appName: string]: {
        profile: {
          [profileName: string]: Record<string, unknown>;
        };
      };
    };
    id: string;
    email: string;
    name: string;
    lang: string[];
    defaultLang: string;
  };
  messages: Record<string, unknown>;
};
