'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as Avatar from '@radix-ui/react-avatar';
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
  const isPortfolio = pathname.startsWith('/portfolio');

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__brand">
          <span className="app-shell__brand-title">PFP</span>
          <span className="app-shell__brand-sub">PersonalFinancePro</span>
        </div>

        <NavigationMenu.Root className="nav-menu-root">
          <NavigationMenu.List className="nav-menu-list">
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link
                  href="/"
                  className={
                    'nav-menu-link' + (isDashboard ? ' nav-menu-link--active' : '')
                  }
                >
                  Dashboard
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link
                  href="/portfolio"
                  className={
                    'nav-menu-link' + (isPortfolio ? ' nav-menu-link--active' : '')
                  }
                >
                  Portfolio
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link
                  href="/trades"
                  className={
                    'nav-menu-link' + (isTrades ? ' nav-menu-link--active' : '')
                  }
                >
                  Trades
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="app-shell__user">
          {user && (
            <div className="user-chip">
              <Avatar.Root className="user-avatar">
                <Avatar.Fallback className="user-avatar-fallback">
                  {user.email?.[0]?.toUpperCase() ?? 'U'}
                </Avatar.Fallback>
              </Avatar.Root>
              <span className="user-email">{user.email}</span>
            </div>
          )}
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

