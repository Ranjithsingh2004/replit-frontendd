/**
 * Layout component with navigation
 */

import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLumenStore } from '@/lib/store';
import clsx from 'clsx';

const Layout: React.FC = () => {
  const { demoMode } = useLumenStore();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏡' },
    { path: '/chat', label: 'Companion', icon: '💬' },
    { path: '/actions', label: 'Actions', icon: '⚡' },
    { path: '/memory', label: 'Memory', icon: '📔' },
    { path: '/dashboard', label: 'Insights', icon: '📊' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 card-paper border-b border-accent-teal/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/assets/orb.svg" alt="Lumen Earth" className="w-10 h-10" />
              <h1 className="text-2xl font-handwritten text-gradient-teal">Lumen Earth</h1>
            </div>

            {demoMode && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-accent-teal text-white px-3 py-1 rounded-full text-xs font-medium"
              >
                Demo Mode Active
              </motion.div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-[73px] z-30 card-paper border-b border-accent-teal/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto scrollbar-custom">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  clsx(
                    'px-4 py-3 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap',
                    isActive
                      ? 'bg-accent-teal/10 text-accent-teal border-b-2 border-accent-teal'
                      : 'text-muted-text hover:text-accent-teal hover:bg-accent-teal/5'
                  )
                }
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="card-paper border-t border-accent-teal/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-muted-text">
          <p>Lumen Earth - Nurture your inner ecosystem</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
