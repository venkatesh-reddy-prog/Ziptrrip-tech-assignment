import { useEffect, useState } from "react";
import { deleteTodo, getTodo, toggleTodo, updateTodo } from "../api";
import { Layout } from "../components/Layout";
import { TodoForm } from "../components/TodoForm";
import type { Todo } from "../types";
import "../styles/app.css";

function App() {
  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const [todo, setTodo] = useState<Todo | null>(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!Number.isInteger(id) || id <= 0) {
      setError("Invalid todo id.");
      return;
    }
    getTodo(id).then(setTodo).catch((e) => setError(e instanceof Error ? e.message : "Todo not found"));
  }, [id]);

  const save = async (input: Parameters<typeof updateTodo>[1]) => {
    const updated = await updateTodo(id, input);
    setTodo(updated);
    setEditing(false);
  };

  const remove = async () => {
    if (!window.confirm("Delete this todo?")) return;
    await deleteTodo(id);
    window.location.href = "/";
  };

  const toggle = async () => setTodo(await toggleTodo(id));

  return (
    <Layout>
      <a className="back-link" href="/">← Back to todos</a>
      {error && <div className="error">{error}</div>}
      {todo && !editing && (
        <section className="detail-card">
          <div className="detail-heading">
            <div>
              <span className={`priority ${todo.priority}`}>{todo.priority}</span>
              <h1 className={todo.completed ? "strike" : ""}>{todo.title}</h1>
            </div>
            <span className={`status ${todo.completed ? "done" : "open"}`}>
              {todo.completed ? "Completed" : "Active"}
            </span>
          </div>

          <div className="detail-body">
            <h3>Description</h3>
            <p>{todo.description || "No description provided."}</p>
          </div>

          <dl className="detail-grid">
            <div><dt>Due date</dt><dd>{todo.dueDate ?? "No due date"}</dd></div>
            <div><dt>Created</dt><dd>{new Date(todo.createdAt).toLocaleString()}</dd></div>
            <div><dt>Updated</dt><dd>{new Date(todo.updatedAt).toLocaleString()}</dd></div>
            <div><dt>Todo ID</dt><dd>#{todo.id}</dd></div>
          </dl>

          <div className="form-actions">
            <button className="button primary" onClick={toggle}>{todo.completed ? "Mark Active" : "Mark Complete"}</button>
            <button className="button secondary" onClick={() => setEditing(true)}>Edit</button>
            <button className="button danger-button" onClick={remove}>Delete</button>
          </div>
        </section>
      )}

      {todo && editing && (
        <section className="panel">
          <h2>Edit todo</h2>
          <TodoForm
            initial={todo}
            submitLabel="Save Changes"
            onSubmit={save}
            onCancel={() => setEditing(false)}
          />
        </section>
      )}
    </Layout>
  );
}

import { createRoot } from "react-dom/client";
createRoot(document.getElementById("root")!).render(<App />);
