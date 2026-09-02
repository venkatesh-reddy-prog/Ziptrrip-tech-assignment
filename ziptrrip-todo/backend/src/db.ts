import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const dataDir = path.join(process.cwd(), "data");
fs.mkdirSync(dataDir, { recursive: true });

export const db = new Database(path.join(dataDir, "todos.db"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    completed INTEGER NOT NULL DEFAULT 0,
    priority TEXT NOT NULL DEFAULT 'medium',
    due_date TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

const count = db.prepare("SELECT COUNT(*) as count FROM todos").get() as { count: number };

if (count.count === 0) {
  const now = new Date().toISOString();
  const insert = db.prepare(`
    INSERT INTO todos (title, description, completed, priority, due_date, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    "Explore the Todo application",
    "Try creating, editing, filtering and completing a todo.",
    0,
    "high",
    null,
    now,
    now
  );

  insert.run(
    "Read the project documentation",
    "Review the API and architecture documentation.",
    0,
    "medium",
    null,
    now,
    now
  );
}
