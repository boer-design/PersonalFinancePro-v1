'use client';

import { ReactNode, useEffect } from 'react';
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
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return null;
  }

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
  const isPortfolio = pathname.startsWith('/portfolio');

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__left">
          <div className="app-shell__brand">
            <div className="brand-mark" aria-hidden>
              PFP
            </div>
            <div className="brand-copy">
              <span className="app-shell__brand-title">PersonalFinancePro</span>
              <span className="app-shell__brand-sub">Wealth cockpit</span>
            </div>
          </div>

          <NavigationMenu.Root className="nav-menu-root">
            <NavigationMenu.List className="nav-menu-list">
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link
                    href="/"
                    className={
                      'nav-menu-link' +
                      (isDashboard ? ' nav-menu-link--active' : '')
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
                      'nav-menu-link' +
                      (isPortfolio ? ' nav-menu-link--active' : '')
                    }
                  >
                    Portfolio
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>

        <div className="app-shell__right">
          <div className="app-shell__stats">
            <div className="stat-pill">
              <span className="stat-label">Net Worth</span>
              <span className="stat-value">$245,300</span>
            </div>
            <div className="stat-pill">
              <span className="stat-label">Portfolio</span>
              <span className="stat-value stat-value--positive">+8.4%</span>
            </div>
          </div>

          <div className="app-shell__user">
            {user && (
              <Avatar.Root className="user-avatar">
                <Avatar.Fallback className="user-avatar-fallback">
                  {user.email?.[0]?.toUpperCase() ?? 'U'}
                </Avatar.Fallback>
              </Avatar.Root>
            )}
            <button
              type="button"
              className="app-shell__logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-shell__main">{children}</main>
    </div>
  );
}

