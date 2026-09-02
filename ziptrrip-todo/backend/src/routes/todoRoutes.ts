import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  listTodos,
  toggleTodo,
  updateTodo
} from "../controllers/todoController";

export const todoRouter = Router();

todoRouter.get("/", listTodos);
todoRouter.get("/:id", getTodo);
todoRouter.post("/", createTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.patch("/:id/toggle", toggleTodo);
todoRouter.delete("/:id", deleteTodo);
