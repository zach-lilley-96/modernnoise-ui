import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../helpers/useAuth';
import { useTheme } from "../helpers/theme";

const Navbar: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex space-x-8 items-center">
          <Link to="/" className="text-2xl font-black bg-indigo-600 text-white px-3 py-1 rounded-lg tracking-tight">MN</Link>
          <div className="hidden md:flex space-x-6 font-medium text-gray-600 dark:text-slate-300">
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
            <Link to="/search" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Search</Link>
            <Link to="/saves" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">My Ratings</Link>
            <Link to="/saved-friends" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Friends</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-full text-sm font-bold border
                       bg-white dark:bg-slate-800
                       text-gray-700 dark:text-slate-200
                       border-gray-200 dark:border-slate-700
                       hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle dark mode"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          {isLoading ? (
            <div className="h-2 w-16 bg-gray-100 dark:bg-slate-800 animate-pulse rounded"></div>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-1.5 rounded-full text-sm font-bold border border-green-100 dark:border-green-800/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Authenticated
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-1.5 rounded-full text-sm font-bold border border-red-100 dark:border-red-800/30 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
              <span className="inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
