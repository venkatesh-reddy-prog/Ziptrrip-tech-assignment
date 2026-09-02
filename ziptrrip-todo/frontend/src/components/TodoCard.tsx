import type { Todo } from "../types";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoCard({ todo, onToggle, onDelete }: Props) {
  return (
    <article className={`todo-card ${todo.completed ? "completed" : ""}`}>
      <button className="check" aria-label={todo.completed ? "Mark incomplete" : "Mark complete"} onClick={() => onToggle(todo.id)}>
        {todo.completed ? "✓" : ""}
      </button>
      <div className="todo-content">
        <a className="todo-title" href={`/todo.html?id=${todo.id}`}>{todo.title}</a>
        {todo.description && <p>{todo.description}</p>}
        <div className="meta">
          <span className={`priority ${todo.priority}`}>{todo.priority}</span>
          {todo.dueDate && <span>Due {todo.dueDate}</span>}
          <span>{new Date(todo.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <button className="icon-button danger" aria-label="Delete todo" onClick={() => onDelete(todo.id)}>Delete</button>
    </article>
  );
}
