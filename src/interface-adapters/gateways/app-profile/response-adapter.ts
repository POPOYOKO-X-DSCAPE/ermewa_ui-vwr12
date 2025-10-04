import type { AppProfileInterface } from "../../../domain/types/app-profile";
import type { AppProfileBodyResponse } from "../../external-types/app-profile";

export const adaptAppProfileResponse = (
  input: AppProfileBodyResponse
): AppProfileInterface => {
  const adaptedUserApps: AppProfileInterface["user"]["app"] = (
    Object.keys(input.USER.APP) as Array<keyof typeof input.USER.APP>
  ).reduce((acc, appKey) => {
    const appValue = input.USER.APP[appKey];
    acc[appKey] = {
      profile: { ...appValue.PRF },
    };
    return acc;
  }, {} as AppProfileInterface["user"]["app"]);

  return {
    $ClassName: input.$ClassName,
    $ClassVer: input.$ClassVer,
    $uid: input.$uid,
    $stamp: input.$stamp,
    headers: input.headers,
    app: {
      name: input.APP.ANAME,
      sid: input.APP.ASID,
      version: input.APP.AVER,
      attributes: input.APP.ATT,
      title: resolveInterpolation(input.PRF.SRV.TITLE.PRM, input),
      permissions: {
        canCopy: input.PRF.SRV.MNG_FILE.PRM.includes('C'),
        canDownload: input.PRF.SRV.MNG_FILE.PRM.includes('D'),
        canMail: input.PRF.SRV.MNG_FILE.PRM.includes('M'),
      }
    },
    profile: {
      name: input.PRF.PNAME,
      pid: input.PRF.PPID,
      sid: input.PRF.PSID,
      parameters: {},
      server: {}
    },
    user: {
      app: adaptedUserApps,
      id: input.USER.UID,
      email: input.USER.UMAIL,
      name: input.USER.UNAME,
      lang: input.USER.LAN,
      defaultLang: input.USER.LANDEF
    },
    messages: input.MSG,
  };
};

function getValueFromPath(obj: unknown, path: string): string {
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (
      current &&
      typeof current === "object" &&
      part in current
    ) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return "";
    }
  }

  return String(current ?? "");
}

function resolveInterpolation(
  template: string,
  input: AppProfileBodyResponse
): string {
  return template.replace(/#XPRM\.([a-zA-Z0-9_$\.]+)#/g, (_, rawPath) => {
    return getValueFromPath(input, rawPath);
  });
}

