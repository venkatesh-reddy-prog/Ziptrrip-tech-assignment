import type { Todo, TodoInput } from "./types";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options?.headers ?? {}) },
    ...options
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      message = body.error ?? message;
    } catch {}
    throw new Error(message);
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

export async function getTodos(params: { completed?: boolean; search?: string } = {}): Promise<Todo[]> {
  const query = new URLSearchParams();
  if (params.completed !== undefined) query.set("completed", String(params.completed));
  if (params.search) query.set("search", params.search);
  const result = await request<{ data: Todo[] }>(`/todos${query.size ? `?${query}` : ""}`);
  return result.data;
}

export async function getTodo(id: number): Promise<Todo> {
  const result = await request<{ data: Todo }>(`/todos/${id}`);
  return result.data;
}

export async function createTodo(input: TodoInput): Promise<Todo> {
  const result = await request<{ data: Todo }>("/todos", {
    method: "POST",
    body: JSON.stringify(input)
  });
  return result.data;
}

export async function updateTodo(id: number, input: Partial<TodoInput> & { completed?: boolean }): Promise<Todo> {
  const result = await request<{ data: Todo }>(`/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(input)
  });
  return result.data;
}

export async function toggleTodo(id: number): Promise<Todo> {
  const result = await request<{ data: Todo }>(`/todos/${id}/toggle`, { method: "PATCH" });
  return result.data;
}

export async function deleteTodo(id: number): Promise<void> {
  await request<void>(`/todos/${id}`, { method: "DELETE" });
}
