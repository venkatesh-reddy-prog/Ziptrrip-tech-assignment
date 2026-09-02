import { db } from "../db";
import type { CreateTodoInput, Todo, UpdateTodoInput } from "../types";

type TodoRow = {
  id: number;
  title: string;
  description: string;
  completed: number;
  priority: Todo["priority"];
  due_date: string | null;
  created_at: string;
  updated_at: string;
};

const mapRow = (row: TodoRow): Todo => ({
  id: row.id,
  title: row.title,
  description: row.description,
  completed: Boolean(row.completed),
  priority: row.priority,
  dueDate: row.due_date,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

export class TodoRepository {
  findAll(filters?: { completed?: boolean; search?: string }): Todo[] {
    let sql = "SELECT * FROM todos";
    const clauses: string[] = [];
    const params: Record<string, unknown> = {};

    if (filters?.completed !== undefined) {
      clauses.push("completed = @completed");
      params.completed = filters.completed ? 1 : 0;
    }

    if (filters?.search?.trim()) {
      clauses.push("(LOWER(title) LIKE @search OR LOWER(description) LIKE @search)");
      params.search = `%${filters.search.trim().toLowerCase()}%`;
    }

    if (clauses.length) sql += ` WHERE ${clauses.join(" AND ")}`;
    sql += " ORDER BY created_at DESC";

    return (db.prepare(sql).all(params) as TodoRow[]).map(mapRow);
  }

  findById(id: number): Todo | null {
    const row = db.prepare("SELECT * FROM todos WHERE id = ?").get(id) as TodoRow | undefined;
    return row ? mapRow(row) : null;
  }

  create(input: CreateTodoInput): Todo {
    const now = new Date().toISOString();
    const result = db.prepare(`
      INSERT INTO todos (title, description, completed, priority, due_date, created_at, updated_at)
      VALUES (@title, @description, 0, @priority, @dueDate, @createdAt, @updatedAt)
    `).run({
      title: input.title.trim(),
      description: input.description ?? "",
      priority: input.priority ?? "medium",
      dueDate: input.dueDate ?? null,
      createdAt: now,
      updatedAt: now
    });

    return this.findById(Number(result.lastInsertRowid))!;
  }

  update(id: number, input: UpdateTodoInput): Todo | null {
    const current = this.findById(id);
    if (!current) return null;

    const next = {
      title: input.title ?? current.title,
      description: input.description ?? current.description,
      completed: input.completed ?? current.completed,
      priority: input.priority ?? current.priority,
      dueDate: input.dueDate === undefined ? current.dueDate : input.dueDate
    };

    const now = new Date().toISOString();

    db.prepare(`
      UPDATE todos
      SET title = @title,
          description = @description,
          completed = @completed,
          priority = @priority,
          due_date = @dueDate,
          updated_at = @updatedAt
      WHERE id = @id
    `).run({
      id,
      title: next.title.trim(),
      description: next.description,
      completed: next.completed ? 1 : 0,
      priority: next.priority,
      dueDate: next.dueDate,
      updatedAt: now
    });

    return this.findById(id);
  }

  toggle(id: number): Todo | null {
    const current = this.findById(id);
    if (!current) return null;
    return this.update(id, { completed: !current.completed });
  }

  delete(id: number): boolean {
    const result = db.prepare("DELETE FROM todos WHERE id = ?").run(id);
    return result.changes > 0;
  }
}

export const todoRepository = new TodoRepository();
