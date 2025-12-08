'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../lib/auth';

type Props = {
  children: ReactNode;
};

export default function AppShell({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (err) {
      // optional: add toast later
      console.error('Logout failed', err);
    }
  };

  const isDashboard = pathname === '/' || pathname === '/dashboard';
  const isTrades = pathname.startsWith('/trades');

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__brand">
          <span className="app-shell__brand-title">PFP</span>
          <span className="app-shell__brand-sub">PersonalFinancePro</span>
        </div>

        <nav className="app-shell__nav">
          <Link
            href="/"
            className={
              'app-shell__nav-link' +
              (isDashboard ? ' app-shell__nav-link--active' : '')
            }
          >
            Dashboard
          </Link>
          <Link
            href="/trades"
            className={
              'app-shell__nav-link' +
              (isTrades ? ' app-shell__nav-link--active' : '')
            }
          >
            Trades
          </Link>
        </nav>

        <div className="app-shell__user">
          {user && <span>{user.email}</span>}
          <button
            type="button"
            className="app-shell__logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="app-shell__main">{children}</main>
    </div>
  );
}

