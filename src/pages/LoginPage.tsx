import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEMO_EMAIL, DEMO_PASSWORD, useAuth } from '../auth';

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (signIn(email, password)) {
      navigate('/todos', { replace: true });
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <main className="card">
      <h1>Sign in</h1>
      <form onSubmit={onSubmit} noValidate>
        <label>
          Email
          <input
            type="email"
            name="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <button type="submit">Sign in</button>
      </form>
      <p className="hint">
        Demo account: <code>{DEMO_EMAIL}</code> / <code>{DEMO_PASSWORD}</code>
      </p>
    </main>
  );
}
