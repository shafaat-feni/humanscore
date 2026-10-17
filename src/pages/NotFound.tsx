import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 bg-navy-900 text-teal rounded-2xl flex items-center justify-center mx-auto shadow-lg">
        <Activity className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-extrabold text-navy-900">404 - Page Not Found</h1>
      <p className="text-slate-600 text-base max-w-md mx-auto">
        The page or assessment you are looking for does not exist or has been moved.
      </p>
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-teal hover:bg-teal-accent text-navy-900 font-bold px-6 py-3 rounded-lg shadow transition"
        >
          <Home className="w-4 h-4" /> Return to Homepage
        </Link>
      </div>
    </div>
  );
};