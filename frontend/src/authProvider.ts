import { AuthBindings } from "@refinedev/core";

export const TOKEN_KEY = "refine-auth";

export type IIdentity = {
  id: number;
  name: string;
  avatar: string;
};

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      localStorage.setItem(TOKEN_KEY, username);
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe " + Math.floor(Math.random() * 100),
        avatar: "https://i.pravatar.cc/300",
      } as IIdentity;
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
