import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Lock, 
  Command, 
  Code2, 
  FolderGit2, 
  User, 
  Cpu, 
  Briefcase, 
  Award, 
  FileText, 
  Mail 
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-bg-dark/80 backdrop-blur-xl border-b border-charcoal-200/80 dark:border-charcoal-800/80 py-3 shadow-sm'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-charcoal-400 rounded-xl p-1"
          aria-label="Karuppasamy A Homepage"
        >
          <div className="w-10 h-10 rounded-xl bg-charcoal-900 dark:bg-white text-white dark:text-charcoal-950 flex items-center justify-center font-mono font-bold text-sm tracking-tighter shadow-md group-hover:scale-105 transition-transform">
            &lt;K/&gt;
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-charcoal-950 dark:text-white leading-none">
              Karuppasamy A
            </span>
            <span className="text-[11px] font-mono text-charcoal-500 dark:text-charcoal-400 mt-1">
              Junior Full Stack Dev
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-charcoal-100/70 dark:bg-charcoal-900/70 p-1.5 rounded-2xl border border-charcoal-200/60 dark:border-charcoal-800/60 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-charcoal-950 dark:text-white font-semibold'
                      : 'text-charcoal-600 dark:text-charcoal-400 hover:text-charcoal-950 dark:hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 bg-white dark:bg-charcoal-800 rounded-xl shadow-sm border border-charcoal-200/60 dark:border-charcoal-700/60"
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Quick command hint button */}
          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
            }}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono text-charcoal-500 dark:text-charcoal-400 border border-charcoal-200 dark:border-charcoal-800 bg-white/50 dark:bg-charcoal-900/50 hover:text-black dark:hover:text-white hover:border-charcoal-400 transition-all"
            title="Open Command Palette (Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5" />
            <span>K</span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Subtle Admin Access Lock Icon */}
          <Link
            to={isAuthenticated ? "/admin" : "/admin/login"}
            className="p-2.5 rounded-xl border border-transparent hover:border-charcoal-200 dark:hover:border-charcoal-800 text-charcoal-400 hover:text-charcoal-800 dark:hover:text-charcoal-200 transition-all"
            title={isAuthenticated ? "Admin Dashboard" : "Admin Login"}
            aria-label="Admin Portal"
          >
            <Lock className={`w-4 h-4 ${isAuthenticated ? 'text-emerald-500' : ''}`} />
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-charcoal-200 dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80 text-charcoal-800 dark:text-charcoal-200 focus:outline-none"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white/95 dark:bg-bg-dark/95 backdrop-blur-2xl border-b border-charcoal-200 dark:border-charcoal-800 px-4 pt-3 pb-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-1 max-w-md mx-auto">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-charcoal-900 text-white dark:bg-white dark:text-charcoal-950 font-semibold shadow-sm'
                        : 'text-charcoal-700 dark:text-charcoal-300 hover:bg-charcoal-100 dark:hover:bg-charcoal-800/60'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-charcoal-950" />
                    )}
                  </Link>
                );
              })}

              <div className="pt-3 mt-2 border-t border-charcoal-200 dark:border-charcoal-800 flex items-center justify-between text-xs text-charcoal-500 font-mono px-2">
                <span>Karuppasamy A</span>
                <Link
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 text-charcoal-500 hover:text-charcoal-900 dark:hover:text-white"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Access</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
