import { useEffect, useState } from 'react';

export type Todo = { id: string; title: string; completed: boolean };
export type Filter = 'all' | 'active' | 'completed';

function storageKey(email: string) {
  return `e2e-playground:todos:${email}`;
}

function load(email: string): Todo[] {
  try {
    const raw = localStorage.getItem(storageKey(email));
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

export function useTodos(email: string) {
  const [todos, setTodos] = useState<Todo[]>(() => load(email));

  useEffect(() => {
    localStorage.setItem(storageKey(email), JSON.stringify(todos));
  }, [email, todos]);

  const add = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return false;
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), title: trimmed, completed: false }]);
    return true;
  };

  const toggle = (id: string) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const remove = (id: string) => setTodos((prev) => prev.filter((t) => t.id !== id));

  const clearCompleted = () => setTodos((prev) => prev.filter((t) => !t.completed));

  return { todos, add, toggle, remove, clearCompleted };
}

export function filterTodos(todos: Todo[], filter: Filter) {
  if (filter === 'active') return todos.filter((t) => !t.completed);
  if (filter === 'completed') return todos.filter((t) => t.completed);
  return todos;
}
