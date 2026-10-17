import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Activity, Menu, X, BarChart2, BookOpen } from 'lucide-react';
import { ASSESSMENTS } from '../../data/assessments';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof ASSESSMENTS>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim().length > 1) {
      setSearchResults(
        ASSESSMENTS.filter(a =>
          a.title.toLowerCase().includes(q.toLowerCase()) ||
          a.shortDescription.toLowerCase().includes(q.toLowerCase())
        )
      );
    } else {
      setSearchResults([]);
    }
  };

  return (
    <header className="bg-navy-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-teal p-2 rounded-lg text-navy-900 font-bold group-hover:bg-teal-accent transition">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight">HumanScore</span>
              <span className="hidden sm:inline-block ml-2 text-xs text-slate-400 font-medium">Measure. Understand. Explore.</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <NavLink to="/tests" className={({isActive}) => isActive ? "text-teal font-semibold" : "text-slate-300 hover:text-white transition"}>
              All Tests
            </NavLink>
            <NavLink to="/physical" className={({isActive}) => isActive ? "text-teal font-semibold" : "text-slate-300 hover:text-white transition"}>
              Physical
            </NavLink>
            <NavLink to="/cognitive" className={({isActive}) => isActive ? "text-teal font-semibold" : "text-slate-300 hover:text-white transition"}>
              Cognitive
            </NavLink>
            <NavLink to="/psychological" className={({isActive}) => isActive ? "text-teal font-semibold" : "text-slate-300 hover:text-white transition"}>
              Psychological
            </NavLink>
            <NavLink to="/lifestyle" className={({isActive}) => isActive ? "text-teal font-semibold" : "text-slate-300 hover:text-white transition"}>
              Lifestyle
            </NavLink>
            <NavLink to="/skills" className={({isActive}) => isActive ? "text-teal font-semibold" : "text-slate-300 hover:text-white transition"}>
              Skills
            </NavLink>
            <NavLink to="/overall-assessment" className={({isActive}) => isActive ? "text-teal font-semibold" : "text-slate-300 hover:text-white transition flex items-center gap-1"}>
              <BarChart2 className="w-4 h-4" /> Index Dashboard
            </NavLink>
          </nav>

          {/* Search Bar / Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block w-48 lg:w-64">
              <input
                type="text"
                placeholder="Search assessments..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full bg-navy-800 text-sm text-white placeholder-slate-400 rounded-md px-3 py-1.5 border border-navy-700 focus:outline-none focus:border-teal"
              />
              {searchResults.length > 0 && (
                <div className="absolute right-0 left-0 mt-2 bg-navy-800 border border-navy-700 rounded-md shadow-xl z-50 max-h-60 overflow-y-auto">
                  {searchResults.map(test => (
                    <Link
                      key={test.id}
                      to={`/tests/${test.slug}`}
                      onClick={() => { setSearchQuery(''); setSearchResults([]); }}
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-slate-300 hover:text-white p-1.5 rounded-md focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-800 border-t border-navy-700 px-4 pt-2 pb-4 space-y-2">
          <div className="py-2">
            <input
              type="text"
              placeholder="Search assessments..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full bg-navy-900 text-sm text-white placeholder-slate-400 rounded-md px-3 py-2 border border-navy-700 focus:outline-none focus:border-teal"
            />
            {searchResults.length > 0 && (
              <div className="mt-2 bg-navy-900 border border-navy-700 rounded-md shadow-xl max-h-48 overflow-y-auto">
                {searchResults.map(test => (
                  <Link
                    key={test.id}
                    to={`/tests/${test.slug}`}
                    onClick={() => { setSearchQuery(''); setSearchResults([]); setMobileMenuOpen(false); }}
                    className="block px-3 py-2 text-xs hover:bg-navy-700 text-slate-200 border-b border-navy-700 last:border-none"
                  >
                    <div className="font-semibold text-white">{test.title}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/tests" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-white">All Tests</Link>
          <Link to="/physical" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-white">Physical</Link>
          <Link to="/cognitive" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-white">Cognitive</Link>
          <Link to="/psychological" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-white">Psychological</Link>
          <Link to="/lifestyle" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-white">Lifestyle</Link>
          <Link to="/skills" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-white">Skills</Link>
          <Link to="/overall-assessment" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-teal font-semibold flex items-center gap-1">
            <BarChart2 className="w-4 h-4" /> Overall Assessment Index
          </Link>
        </div>
      )}
    </header>
  );
};