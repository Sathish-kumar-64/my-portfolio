import React from 'react';
import { motion } from 'framer-motion';

export function StatCard({ label, value, suffix = "+", icon: Icon }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center gap-4"
    >
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div>
        <div className="text-3xl font-extrabold text-slate-100 flex items-center">
          {value}
          <span className="text-cyan-400">{suffix}</span>
        </div>
        <div className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
          {label}
        </div>
      </div>
    </motion.div>
  );
}
