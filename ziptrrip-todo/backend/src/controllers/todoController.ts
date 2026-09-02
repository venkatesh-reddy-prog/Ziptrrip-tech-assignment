import type { Request, Response } from "express";
import { todoRepository } from "../repositories/todoRepository";
import { createTodoSchema, updateTodoSchema } from "../validation";

const parseId = (value: string): number | null => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

export const listTodos = (req: Request, res: Response) => {
  const completedRaw = typeof req.query.completed === "string" ? req.query.completed : undefined;
  const completed = completedRaw === undefined ? undefined : completedRaw === "true" ? true : completedRaw === "false" ? false : null;

  if (completed === null) {
    return res.status(400).json({ error: "completed must be true or false" });
  }

  const search = typeof req.query.search === "string" ? req.query.search : undefined;
  return res.json({ data: todoRepository.findAll({ completed, search }) });
};

export const getTodo = (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid todo id" });

  const todo = todoRepository.findById(id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  return res.json({ data: todo });
};

export const createTodo = (req: Request, res: Response) => {
  const parsed = createTodoSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });

  const todo = todoRepository.create(parsed.data);
  return res.status(201).json({ data: todo });
};

export const updateTodo = (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid todo id" });

  const parsed = updateTodoSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });

  const todo = todoRepository.update(id, parsed.data);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  return res.json({ data: todo });
};

export const toggleTodo = (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid todo id" });

  const todo = todoRepository.toggle(id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  return res.json({ data: todo });
};

export const deleteTodo = (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid todo id" });

  const deleted = todoRepository.delete(id);
  if (!deleted) return res.status(404).json({ error: "Todo not found" });

  return res.status(204).send();
};
