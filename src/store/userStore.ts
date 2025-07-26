import { create } from "zustand";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface UserState {
  token: string | null;
  error: string | null;
  isLoading: boolean;
  login: (data: loginFormat) => Promise<boolean>;
  signup: (data: loginFormat) => Promise<boolean>;
  clearError: () => void;
  logout: () => void;
  printsomething: () => string;
}
type loginFormat = { email: string; password: string };

const useUserStore = create<UserState>((set) => ({
  token: typeof window !== "undefined" ? sessionStorage.getItem("token") : null,
  error: null,
  isLoading: false,

  login: async (loginData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${backendURL}user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData || "Login failed");
      }
      const userData = await res.json();
      const token = userData.access_token;
      document.cookie = `Authorization=Bearer ${token}; Path=/; Secure; SameSite=Strict`;
      set({ isLoading: false, token: token });
      return true;
    } catch (err: unknown) {
      let message = "Unexpected error";
      if (err instanceof Error) {
        message = err.message;
      }
      set({ error: message, isLoading: false });
      return false;
    }
  },
  clearError: () => {
    set({ error: null });
  },

  logout: () => {
    document.cookie =
      "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict";
    set({ token: null });
    sessionStorage.clear();
  },

  signup: async (registerData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${backendURL}user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registerData["email"],
          password: registerData["password"],
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData || "Login failed");
      }
      const userData = await res.json();
      const token = userData.access_token;
      document.cookie = `Authorization=Bearer ${token}; Path=/; Secure; SameSite=Strict`;
      set({ isLoading: false });
      return true;
    } catch (err: unknown) {
      let message = "Unexpected error";
      if (err instanceof Error) {
        message = err.message;
      }
      set({ error: message, isLoading: false });
      return false;
    }
  },

  printsomething: () => {
    return "Hello from the store";
  },
}));

export default useUserStore;
