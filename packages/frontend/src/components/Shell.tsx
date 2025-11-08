/**
 * Shell - Premium app shell with 12-column grid and glass header
 * Desktop: 3/6/3 layout (left rail / center / right rail)
 * Tablet: 4/4/4 or stacked
 * Mobile: Stacked with sticky orb bar
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLumenStore } from '@/lib/store';
import { zIndex } from '@/styles/theme';

interface ShellProps {
  children: React.ReactNode;
  leftRail?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightRail?: React.ReactNode;
}

/**
 * Glass Header - Compact with backdrop blur and shrink on scroll
 */
const GlassHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { demoMode, toggleDemoMode } = useLumenStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/chat', label: 'Chat' },
    { path: '/actions', label: 'Actions' },
    { path: '/memory', label: 'Memory' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 bg-glass backdrop-blur-md border-b border-border-light transition-all duration-280"
      style={{ zIndex: zIndex.header }}
      animate={{
        paddingTop: isScrolled ? '12px' : '16px',
        paddingBottom: isScrolled ? '12px' : '16px',
      }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-teal to-stroke-teal shadow-orb flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                width: isScrolled ? '32px' : '40px',
                height: isScrolled ? '32px' : '40px',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path
                  d="M12 2L8 12h8L12 2z"
                  fill="currentColor"
                  opacity="0.9"
                />
                <circle cx="12" cy="16" r="2" fill="currentColor" opacity="0.6" />
              </svg>
            </motion.div>
            <motion.span
              className="font-handwritten text-h4 text-text-primary"
              animate={{
                fontSize: isScrolled ? '18px' : '20px',
              }}
            >
              Lumen Earth
            </motion.span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    relative px-4 py-2 rounded-lg text-body-sm font-medium transition-colors
                    ${isActive ? 'text-accent-teal' : 'text-text-secondary hover:text-text-primary'}
                  `}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-teal"
                      layoutId="activeNav"
                      transition={{ duration: 0.28, ease: [0.2, 0.9, 0.2, 1] }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Demo Mode Toggle */}
            <button
              onClick={toggleDemoMode}
              className={`
                px-3 py-1.5 rounded-full text-caption font-medium transition-all duration-280
                ${demoMode
                  ? 'bg-accent-teal text-white shadow-card'
                  : 'bg-bg-muted text-text-muted hover:bg-border-light'
                }
              `}
              aria-pressed={demoMode}
              aria-label="Toggle demo mode"
            >
              {demoMode ? 'Demo Active' : 'Demo Mode'}
            </button>

            {/* Settings */}
            <button
              onClick={() => navigate('/settings')}
              className="w-9 h-9 rounded-full bg-bg-muted hover:bg-border-light transition-colors flex items-center justify-center"
              aria-label="Settings"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-text-secondary">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

/**
 * Shell Component - 12-column grid layout
 */
const Shell: React.FC<ShellProps> = ({
  children,
  leftRail,
  centerContent,
  rightRail,
}) => {
  // If using slot-based layout
  if (leftRail || centerContent || rightRail) {
    return (
      <div className="min-h-screen bg-bg-paper">
        <GlassHeader />

        {/* Content with top padding for fixed header */}
        <main className="pt-24 px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* 12-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Rail - 3 columns */}
              {leftRail && (
                <aside className="lg:col-span-3">
                  {leftRail}
                </aside>
              )}

              {/* Center Content - 6 columns */}
              {centerContent && (
                <div className={`${leftRail && rightRail ? 'lg:col-span-6' : leftRail || rightRail ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
                  {centerContent}
                </div>
              )}

              {/* Right Rail - 3 columns */}
              {rightRail && (
                <aside className="lg:col-span-3">
                  {rightRail}
                </aside>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  // If using children directly
  return (
    <div className="min-h-screen bg-bg-paper">
      <GlassHeader />

      {/* Content with top padding for fixed header */}
      <main className="pt-24 px-8 pb-12">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

/**
 * Footer - Minimal, unobtrusive
 */
const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border-light bg-bg-card py-6">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-caption text-text-muted">
            Lumen Earth &middot; Mindful growth, ecological awareness
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-caption text-text-muted hover:text-accent-teal transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-caption text-text-muted hover:text-accent-teal transition-colors"
            >
              Privacy
            </a>
            <a
              href="/settings"
              className="text-caption text-text-muted hover:text-accent-teal transition-colors"
            >
              Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Shell;
