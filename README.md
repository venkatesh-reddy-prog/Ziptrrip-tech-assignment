# Ziptrrip Tech — Todo Application

A production-style Todo application built for the Ziptrrip Tech assignment.

## Stack

- **Frontend:** React + TypeScript + Vite
- **Architecture:** Multi Page Application (MPA), with separate Todo List and Todo Detail entry points
- **Backend:** Node.js + Express + TypeScript
- **Database:** SQLite via `better-sqlite3`
- **Validation:** Zod
- **Tests:** Vitest + Supertest
- **API collection:** Postman collection included

## Features

### Todo List page
- View all todos
- Create a todo
- Edit a todo
- Mark complete/incomplete
- Delete a todo
- Search by title/description
- Filter by All / Active / Completed
- Sort by newest / oldest / title
- Priority selection
- Due date
- Responsive UI
- Direct links to each todo detail page

### Todo Detail page
- Receives `id` as a query parameter
- Displays full todo information
- Edit todo
- Toggle completion
- Delete todo
- Back to todo list

## API

Base URL: `http://localhost:4000/api`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/todos` | List todos |
| GET | `/todos/:id` | Get one todo |
| POST | `/todos` | Create todo |
| PUT | `/todos/:id` | Update todo |
| PATCH | `/todos/:id/toggle` | Toggle completion |
| DELETE | `/todos/:id` | Delete todo |
| GET | `/health` | Health check |

## Run locally

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:4000`.

### 2. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

Open:

- Todo list: `http://localhost:5173/`
- Todo detail: `http://localhost:5173/todo.html?id=1`

## Production build

Backend:

```bash
cd backend
npm run build
npm start
```

Frontend:

```bash
cd frontend
npm run build
npm run preview
```

## Tests

```bash
cd backend
npm test
```

## Postman

Import:

`docs/postman/Ziptrrip-Todo.postman_collection.json`

The collection uses `http://localhost:4000` as `baseUrl`.

## MPA implementation

This is intentionally **not a SPA**.

Vite has two HTML entry points:

- `index.html` → Todo List page
- `todo.html` → Todo Detail page

Each page loads its own React entry module:

- `src/pages/list.tsx`
- `src/pages/detail.tsx`

Navigation between the pages uses normal document navigation, so the browser loads a new HTML document.

## Project structure

```text
ziptrrip-todo/
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── db.ts
│   │   ├── types.ts
│   │   ├── validation.ts
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── repositories/
│   ├── tests/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api.ts
│   │   ├── types.ts
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   ├── index.html
│   ├── todo.html
│   └── vite.config.ts
├── docs/
│   ├── FEATURES.md
│   ├── API.md
│   └── postman/
└── README.md
```

## Database

SQLite database file is created automatically at:

`backend/data/todos.db`

The application seeds a few sample todos only when the database is empty.

## Assignment mapping

- React application: ✅
- Multiple Page Application: ✅
- Todo list page: ✅
- Todo detail page with query parameter: ✅
- JavaScript/TypeScript backend: ✅
- CRUD APIs: ✅
- Persistent database: ✅
- TypeScript: ✅
- Unit/API tests: ✅
- Postman collection: ✅
- Markdown documentation: ✅
- Organized codebase: ✅
