# Features & Functionalities

## 1. Todo creation

The list page contains a create form with:

- Title
- Description
- Priority
- Due date

Title is required. The API validates the request before writing to SQLite.

## 2. Todo list

Todos are displayed as cards containing:

- Title
- Description
- Completion status
- Priority
- Due date
- Creation date
- Actions

## 3. Search

Search matches todo title and description.

## 4. Filters

The list can be filtered by:

- All
- Active
- Completed

## 5. Sorting

Available sort options:

- Newest first
- Oldest first
- Title A–Z
- Priority

## 6. Todo detail

The second MPA page is opened as:

`todo.html?id=<todo-id>`

It displays the complete todo and provides edit, toggle and delete operations.

## 7. Persistence

Todos are stored in SQLite. Restarting the backend does not remove existing todos.

## 8. Validation

The backend uses Zod to validate create and update payloads.

## 9. Error handling

The API returns JSON errors with appropriate HTTP status codes.

## 10. Responsive design

The frontend works on desktop and mobile widths.

## 11. Accessibility

Forms have labels, buttons have descriptive text, and status is conveyed using text as well as visual styling.
