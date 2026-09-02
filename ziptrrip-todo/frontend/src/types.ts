export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TodoInput {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string | null;
}
