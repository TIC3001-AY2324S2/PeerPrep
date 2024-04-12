import { AccessControlProvider } from "@refinedev/core";
import { authProvider } from "./authProvider";

export const accessControlProvider: AccessControlProvider = {
  can: async ({ action, params }) => {
    const requiredPermissions = params?.resource?.meta?.requiredPermissions?.[action] as string[];
    if (requiredPermissions === undefined) {
      return { can: true };
    }

    const permissions = authProvider.getPermissions ? await authProvider.getPermissions() as string[] : undefined;
    if (permissions && requiredPermissions.some((requiredPermission: string) => permissions.includes(requiredPermission))) {
      return { can: true };
    }

    return {
      can: false,
      reason: "Unauthorized",
    };
  },
  options: {
    buttons: {
      hideIfUnauthorized: true,
    },
  },
};
