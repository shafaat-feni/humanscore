import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Activity, Menu, X, BarChart2 } from 'lucide-react';
import { ASSESSMENTS } from '../../data/assessments';
import { CATEGORIES } from '../../data/categories';
import { searchAssessments } from '../../utils/search';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'text-teal font-semibold' : 'text-slate-300 hover:text-white transition';

const dashboardClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-1 ${linkClass({ isActive })}`;

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const headerRef = useRef<HTMLElement>(null);

  const searchResults = useMemo(
    () => (searchQuery.trim().length > 1 ? searchAssessments(ASSESSMENTS, searchQuery) : []),
    [searchQuery]
  );

  const clearSearch = () => setSearchQuery('');

  // Close the search dropdown on outside click or Escape.
  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setSearchQuery('');
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchQuery('');
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header ref={headerRef} className="bg-navy-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-teal p-2 rounded-lg text-navy-900 font-bold group-hover:bg-teal-accent transition">
              <Activity className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight">HumanScore</span>
              <span className="hidden sm:inline-block ml-2 text-xs text-slate-400 font-medium">Measure. Understand. Explore.</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main" className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <NavLink to="/tests" className={linkClass}>All Tests</NavLink>
            {CATEGORIES.map(cat => (
              <NavLink key={cat.slug} to={`/${cat.slug}`} className={linkClass}>
                {cat.name}
              </NavLink>
            ))}
            <NavLink to="/overall-assessment" className={dashboardClass}>
              <BarChart2 className="w-4 h-4" aria-hidden="true" /> Index Dashboard
            </NavLink>
          </nav>

          {/* Search Bar / Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block w-48 lg:w-64">
              <input
                type="search"
                aria-label="Search assessments"
                placeholder="Search assessments..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-navy-800 text-sm text-white placeholder-slate-400 rounded-md px-3 py-1.5 border border-navy-700 focus:outline-none focus:border-teal"
              />
              {searchResults.length > 0 && (
                <div className="absolute right-0 left-0 mt-2 bg-navy-800 border border-navy-700 rounded-md shadow-xl z-50 max-h-60 overflow-y-auto">
                  {searchResults.map(test => (
                    <Link
                      key={test.id}
                      to={`/tests/${test.slug}`}
                      onClick={clearSearch}
                      className="block px-3 py-2 text-xs hover:bg-navy-700 text-slate-200 border-b border-navy-700/50 last:border-none"
                    >
                      <div className="font-semibold text-white">{test.title}</div>
                      <div className="text-slate-400 capitalize">{test.category}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(open => !open)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden text-slate-300 hover:text-white p-1.5 rounded-md"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-navy-800 border-t border-navy-700 px-4 pt-2 pb-4 space-y-2">
          <div className="py-2">
            <input
              type="search"
              aria-label="Search assessments"
              placeholder="Search assessments..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-navy-900 text-sm text-white placeholder-slate-400 rounded-md px-3 py-2 border border-navy-700 focus:outline-none focus:border-teal"
            />
            {searchResults.length > 0 && (
              <div className="mt-2 bg-navy-900 border border-navy-700 rounded-md shadow-xl max-h-48 overflow-y-auto">
                {searchResults.map(test => (
                  <Link
                    key={test.id}
                    to={`/tests/${test.slug}`}
                    onClick={() => { clearSearch(); closeMobile(); }}
                    className="block px-3 py-2 text-xs hover:bg-navy-700 text-slate-200 border-b border-navy-700 last:border-none"
                  >
                    <div className="font-semibold text-white">{test.title}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/tests" onClick={closeMobile} className="block py-2 text-slate-300 hover:text-white">All Tests</Link>
          {CATEGORIES.map(cat => (
            <Link key={cat.slug} to={`/${cat.slug}`} onClick={closeMobile} className="block py-2 text-slate-300 hover:text-white">
              {cat.name}
            </Link>
          ))}
          <Link to="/overall-assessment" onClick={closeMobile} className="py-2 text-teal font-semibold flex items-center gap-1">
            <BarChart2 className="w-4 h-4" aria-hidden="true" /> Overall Assessment Index
          </Link>
        </div>
      )}
    </header>
  );
};
