import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth';
import { LoginPage } from './pages/LoginPage';
import { TodosPage } from './pages/TodosPage';

function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/todos" replace /> : <LoginPage />} />
      <Route
        path="/todos"
        element={
          <RequireAuth>
            <TodosPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to={user ? '/todos' : '/login'} replace />} />
    </Routes>
  );
}
