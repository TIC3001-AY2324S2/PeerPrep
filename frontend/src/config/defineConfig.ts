import { AppInitialConfig } from "./types";

export function defineConfig(appInitialConfig: AppInitialConfig) {
  return {
    userService: {
      endpoint: appInitialConfig.userServiceEndpoint,
      loginEndpoint: `${appInitialConfig.userServiceEndpoint}/auth/login`,
    },
  };
}
