'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '../lib/config';
import { useAuth } from '../lib/auth';

// You can swap this markup to Radix UI later – keeping it simple for now
export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Login failed');
      }

      const data = await res.json();

      const token = data.token ?? data.access_token;
      const user = data.user ?? { id: data.id, email: data.email };

      if (!token || !user) {
        throw new Error('Invalid login response from server');
      }

      login(token, user);
      router.push('/'); // go to dashboard
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#05060a',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 360,
          padding: 24,
          borderRadius: 12,
          background: '#111827',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>Sign in</h1>
        <p style={{ fontSize: 14, opacity: 0.7 }}>
          Sign in to PersonalFinancePro
        </p>

        {error && (
          <div
            style={{
              padding: 8,
              borderRadius: 6,
              background: '#7f1d1d',
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        <label style={{ fontSize: 14 }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              marginTop: 4,
              width: '100%',
              padding: '8px 10px',
              borderRadius: 6,
              border: '1px solid #4b5563',
              background: '#020617',
              color: 'white',
            }}
          />
        </label>

        <label style={{ fontSize: 14 }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginTop: 4,
              width: '100%',
              padding: '8px 10px',
              borderRadius: 6,
              border: '1px solid #4b5563',
              background: '#020617',
              color: 'white',
            }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 8,
            padding: '8px 10px',
            borderRadius: 6,
            border: 'none',
            background: '#4338ca',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
