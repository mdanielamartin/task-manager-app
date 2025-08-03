import { create } from "zustand";

const backendURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/";

interface TaskState {
  error: string | null;
  isLoading: boolean;
  tasks: Task[];
  addTask: (data: TaskFormat) => Promise<boolean>;
  updateTask: (data: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  setDoneTasks: (ids: number[]) => Promise<void>;
  setIncompleteTasks: (ids: number[]) => Promise<void>;
  getTasks: () => Promise<void>;
  clearError: () => void;
}
interface Task {
  name: string;
  id: number;
  description?: string | null;
  status: boolean;
}
interface TaskFormat {
  name: string;
  description?: string | null;
}

const useTaskStore = create<TaskState>((set) => ({
  error: null,
  isLoading: false,
  tasks: [],

  addTask: async (data: TaskFormat) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${backendURL}task/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData || "Task addition failed");
      }
      const task = await res.json();
      set((state) => ({ isLoading: false, tasks: [...state.tasks, task] }));
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

  updateTask: async (data: Task) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${backendURL}task/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData || "Login failed");
      }

      const updatedTask = await res.json();

      set((state) => ({
        isLoading: false,
        tasks: state.tasks.map((t) =>
          t.id === updatedTask.id ? { ...t, ...updatedTask } : t,
        ),
      }));
    } catch (err: unknown) {
      let message = "Unexpected error";
      if (err instanceof Error) {
        message = err.message;
      }
      set({ error: message, isLoading: false });
    }
  },

  deleteTask: async (taskId: number) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${backendURL}task/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData || "Login failed");
      }
      set((state) => ({
        isLoading: false,
        tasks: state.tasks.filter((t) => t.id !== taskId),
      }));
    } catch (err: unknown) {
      let message = "Unexpected error";
      if (err instanceof Error) {
        message = err.message;
      }
      set({ error: message, isLoading: false });
    }
  },

  getTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${backendURL}task/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData || "Login failed");
      }
      const tasks = await res.json();
      set({ isLoading: false, tasks: tasks });
    } catch (err: unknown) {
      let message = "Unexpected error";
      if (err instanceof Error) {
        message = err.message;
      }
      set({ error: message, isLoading: false });
    }
  },

  setIncompleteTasks: async (ids: number[]) => {
    set({ isLoading: true, error: null });
    if (ids.length === 0) {
      return;
    }
    try {
      const res = await fetch(`${backendURL}task/incomplete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ids),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData || "Login failed");
      }
      set((state) => ({
        isLoading: false,
        tasks: state.tasks.map((t) =>
          ids.includes(t.id) ? { ...t, status: false } : t,
        ),
      }));
    } catch (err: unknown) {
      let message = "Unexpected error";
      if (err instanceof Error) {
        message = err.message;
      }
      set({ error: message, isLoading: false });
    }
  },

  setDoneTasks: async (ids: number[]) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${backendURL}task/done`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ids),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData || "Login failed");
      }
      set((state) => ({
        isLoading: false,
        tasks: state.tasks.map((t) =>
          ids.includes(t.id) ? { ...t, status: true } : t,
        ),
      }));
    } catch (err: unknown) {
      let message = "Unexpected error";
      if (err instanceof Error) {
        message = err.message;
      }
      set({ error: message, isLoading: false });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useTaskStore;
