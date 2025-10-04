export type AppProfileBodyResponse = {
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
  APP: {
    ANAME: Record<string, string>; // ENG, FRA, GER, etc.
    ASID: string;
    AVER: string;
    SRV: {
      XMSG: {
        PRM: string;
        TYP: string;
        VAL: Record<string, unknown>;
      };
    };
    ATT?: Record<string, unknown>; // Optionnel selon ta logique
  };
  PRF: {
    PNAME: Record<string, string>;
    PPID: string;
    PSID: string;
    PRM: Record<string, unknown>; // vide dans l'exemple mais potentiellement typable plus tard
    SRV: {
      TITLE: {
        PRM: string;
        TYP: string;
        VAL: Record<string, unknown>;
      };
      MNG_FILE: {
        PRM: string;
        TYP: string;
        VAL: Record<string, unknown>;
      };
      FORMATS: {
        PRM: string;
        TYP: string;
        VAL: Record<string, unknown>;
      };
      DSP_STATUS: {
        PRM: string;
        TYP: string;
        VAL: Record<string, unknown>;
      };
    };
  };
  USER: {
    APP: {
      [appCode: string]: {
        PRF: {
          [profileCode: string]: Record<string, unknown>;
        };
      };
    };
    UID: string;
    UMAIL: string;
    UNAME: string;
    LAN: string[];
    LANDEF: string;
  };
  MSG: Record<string, unknown>;
};
