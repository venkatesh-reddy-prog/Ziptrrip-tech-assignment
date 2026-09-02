import type { PropsWithChildren } from "react";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/">Ziptrrip <span>Todo</span></a>
        <a className="header-link" href="/">All Todos</a>
      </header>
      <main className="container">{children}</main>
      <footer>Built with React, TypeScript, Express and SQLite.</footer>
    </div>
  );
}
