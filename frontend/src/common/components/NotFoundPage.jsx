import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="glass-panel p-12 rounded-3xl border border-cyan-500/20 max-w-lg space-y-6 shadow-2xl">
        <span className="text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          404
        </span>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Page Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          The route or page you are looking for doesn't exist or has been relocated.
        </p>

        <NavLink
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold text-sm shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back To Home</span>
        </NavLink>
      </div>
    </div>
  );
}
