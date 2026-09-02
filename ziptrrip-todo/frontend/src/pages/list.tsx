import { useEffect, useMemo, useState } from "react";
import { createTodo, deleteTodo, getTodos, toggleTodo } from "../api";
import { Layout } from "../components/Layout";
import { TodoCard } from "../components/TodoCard";
import { TodoForm } from "../components/TodoForm";
import type { Todo } from "../types";
import "../styles/app.css";

type Filter = "all" | "active" | "completed";
type Sort = "newest" | "oldest" | "title" | "priority";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const completed = filter === "all" ? undefined : filter === "completed";
      setTodos(await getTodos({ completed, search }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load todos");
    }
  };

  useEffect(() => { void load(); }, [filter, search]);

  const sorted = useMemo(() => {
    return [...todos].sort((a, b) => {
      if (sort === "oldest") return a.createdAt.localeCompare(b.createdAt);
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "priority") {
        const rank = { high: 0, medium: 1, low: 2 };
        return rank[a.priority] - rank[b.priority];
      }
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [todos, sort]);

  const handleCreate = async (input: Parameters<typeof createTodo>[0]) => {
    await createTodo(input);
    setShowForm(false);
    await load();
  };

  const handleToggle = async (id: number) => {
    await toggleTodo(id);
    await load();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this todo?")) return;
    await deleteTodo(id);
    await load();
  };

  return (
    <Layout>
      <section className="hero">
        <div>
          <p className="eyebrow">TASK MANAGEMENT</p>
          <h1>Get things done.</h1>
          <p className="subtitle">A clean, fast todo workspace for planning your day.</p>
        </div>
        <button className="button primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Close" : "+ New Todo"}
        </button>
      </section>

      {showForm && (
        <section className="panel">
          <h2>Create a todo</h2>
          <TodoForm submitLabel="Create Todo" onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </section>
      )}

      <section className="toolbar">
        <input className="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search todos..." />
        <div className="filters">
          {(["all", "active", "completed"] as Filter[]).map((item) => (
            <button key={item} className={`filter ${filter === item ? "selected" : ""}`} onClick={() => setFilter(item)}>
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort todos">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title A–Z</option>
          <option value="priority">Priority</option>
        </select>
      </section>

      {error && <div className="error">{error}</div>}

      <section className="todo-list">
        {!error && sorted.length === 0 && (
          <div className="empty">
            <div className="empty-icon">✓</div>
            <h2>No todos found</h2>
            <p>Create a todo or change your filters.</p>
          </div>
        )}
        {sorted.map((todo) => (
          <TodoCard key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
        ))}
      </section>
    </Layout>
  );
}

import { createRoot } from "react-dom/client";
createRoot(document.getElementById("root")!).render(<App />);
