import { createContext, useContext, useState, type ReactNode } from 'react';

export const DEMO_EMAIL = 'demo@example.test';
export const DEMO_PASSWORD = 'password';

const SESSION_KEY = 'e2e-playground:session';

export type User = { email: string; name: string };

type AuthContextValue = {
  user: User | null;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function loadSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadSession);

  const signIn = (email: string, password: string) => {
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      return false;
    }
    const next: User = { email: DEMO_EMAIL, name: 'Demo User' };
    localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    setUser(next);
    return true;
  };

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
