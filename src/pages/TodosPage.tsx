import { useState, type FormEvent } from 'react';
import { useAuth } from '../auth';
import { filterTodos, useTodos, type Filter } from '../todos';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function TodosPage() {
  const { user, signOut } = useAuth();
  const { todos, add, toggle, remove, clearCompleted } = useTodos(user!.email);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const visible = filterTodos(todos, filter);
  const remaining = todos.filter((t) => !t.completed).length;
  const hasCompleted = todos.some((t) => t.completed);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (add(title)) setTitle('');
  };

  return (
    <main className="card">
      <header className="header">
        <h1>Todos</h1>
        <div className="user">
          <span>Signed in as {user!.name}</span>
          <button type="button" className="secondary" onClick={signOut}>
            Sign out
          </button>
        </div>
      </header>

      <form onSubmit={onSubmit} className="new-todo">
        <label>
          New todo
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to be done?" />
        </label>
        <button type="submit">Add</button>
      </form>

      <nav aria-label="Filter todos" className="filters">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </nav>

      {visible.length === 0 ? (
        <p className="empty">No todos to show.</p>
      ) : (
        <ul aria-label="Todo list" className="todo-list">
          {visible.map((t) => (
            <li key={t.id} className={t.completed ? 'done' : undefined}>
              <label>
                <input type="checkbox" checked={t.completed} onChange={() => toggle(t.id)} />
                <span>{t.title}</span>
              </label>
              <button type="button" className="secondary" aria-label={`Delete ${t.title}`} onClick={() => remove(t.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <footer className="footer">
        <p role="status">{remaining} remaining</p>
        {hasCompleted && (
          <button type="button" className="secondary" onClick={clearCompleted}>
            Clear completed
          </button>
        )}
      </footer>
    </main>
  );
}
