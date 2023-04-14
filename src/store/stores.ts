import { create } from "zustand";
import { TaskType } from "../types/types";

interface TaskStore {
  tasks: TaskType[];
  refresh: boolean | number;
  setTasks: (task: TaskType[]) => void;
  refreshing: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  refresh: 1,
  setTasks: (task: TaskType[]) => set((_state) => ({ tasks: task })),
  refreshing: () => set((_state) => ({ refresh: Math.random() })),
}));
