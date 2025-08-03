import { create } from "zustand";

const backendURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/";

interface UserState {
  error: string | null;
  isLoading: boolean;
  status: boolean;
  login: (data: loginFormat) => Promise<boolean>;
  signup: (data: loginFormat) => Promise<boolean>;
  clearError: () => void;
  logout: () => Promise<void>;
}
type loginFormat = { email: string; password: string };

const useUserStore = create<UserState>((set) => ({
  error: null,
  isLoading: false,
  status: true,

  login: async (loginData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${backendURL}user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData || "Login failed");
      }
      set({ isLoading: false, status: true });
      return true;
    } catch (err: unknown) {
      let message = "Unexpected error";
      if (err instanceof Error) {
        message = err.message;
      }
      set({ error: message, isLoading: false, status: false });
      return false;
    }
  },
  clearError: () => {
    set({ error: null });
  },

  logout: async () => {
    try {
      const res = await fetch(`${backendURL}user/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData || "Logout failed");
      }
      set({ isLoading: false, status: false });
    } catch (err: unknown) {
      let message = "Unexpected error";
      if (err instanceof Error) {
        message = err.message;
        set({ error: message, isLoading: false });
      }
    }
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
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData || "Sign Up failed");
      }
      set({ isLoading: false, status: true });
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
}));

export default useUserStore;
