import React from 'react';

export function SkeletonLoader({ type = "card", count = 3 }) {
  const items = Array.from({ length: count });

  if (type === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((_, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl animate-pulse space-y-4">
            <div className="h-40 bg-slate-800/60 rounded-xl" />
            <div className="h-6 bg-slate-800/80 rounded w-3/4" />
            <div className="h-4 bg-slate-800/50 rounded w-full" />
            <div className="h-4 bg-slate-800/50 rounded w-2/3" />
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-16 bg-slate-800/80 rounded-full" />
              <div className="h-6 w-16 bg-slate-800/80 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-pulse">
      {items.map((_, i) => (
        <div key={i} className="h-16 bg-slate-800/50 rounded-xl w-full" />
      ))}
    </div>
  );
}
