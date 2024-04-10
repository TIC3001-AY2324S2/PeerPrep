import { defineConfig } from "./defineConfig";

export const appConfig = defineConfig({
  userServiceEndpoint: import.meta.env.VITE_USER_SERVICE_ENDPOINT,
});
