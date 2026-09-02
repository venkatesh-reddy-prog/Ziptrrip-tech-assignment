import { useState } from "react";
import type { Priority, TodoInput } from "../types";

interface Props {
  initial?: Partial<TodoInput>;
  submitLabel: string;
  onSubmit: (input: TodoInput) => Promise<void>;
  onCancel?: () => void;
}

export function TodoForm({ initial, submitLabel, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? "medium");
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      await onSubmit({ title: title.trim(), description, priority, dueDate: dueDate || null });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to be done?" maxLength={200} required />
      </label>
      <label>
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add some context..." rows={4} maxLength={2000} />
      </label>
      <div className="form-grid">
        <label>
          Priority
          <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Due date
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
      </div>
      <div className="form-actions">
        {onCancel && <button type="button" className="button secondary" onClick={onCancel}>Cancel</button>}
        <button className="button primary" disabled={saving}>{saving ? "Saving..." : submitLabel}</button>
      </div>
    </form>
  );
}
