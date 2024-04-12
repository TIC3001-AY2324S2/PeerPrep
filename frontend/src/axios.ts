import { axiosInstance } from "@refinedev/simple-rest";

axiosInstance.interceptors.request.use((requestConfig) => {
  const accessToken = sessionStorage.getItem("auth-token");
  if (requestConfig?.headers && accessToken) {
    requestConfig.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return requestConfig;
});

export { axiosInstance };

