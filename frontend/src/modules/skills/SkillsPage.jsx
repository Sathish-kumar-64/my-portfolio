import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layers, Database, Cloud, Terminal, Code } from 'lucide-react';
import { portfolioService } from '../../services/portfolioService';
import { SkeletonLoader } from '../../common/components/SkeletonLoader';

export function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portfolioService.getSkills().then((res) => {
      setSkills(res);
      setLoading(false);
    });
  }, []);

  const categories = [
    { key: 'all', label: 'All Tech', icon: Cpu },
    { key: 'frontend', label: 'Frontend', icon: Layers },
    { key: 'backend', label: 'Backend API', icon: Terminal },
    { key: 'database', label: 'Databases', icon: Database },
    { key: 'cloud', label: 'Cloud & Infrastructure', icon: Cloud },
    { key: 'devops', label: 'DevOps & CI/CD', icon: Code },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Technical Expertise</span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">Skills & Mastery</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Comprehensive summary of my tech stack across frontend engineering, backend REST architecture, databases, cloud, and DevOps pipelines.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                  : 'glass-card text-slate-700 dark:text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid with Animated Progress Bars */}
      {loading ? (
        <SkeletonLoader type="card" count={6} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{skill.name}</h3>
                <span className="text-sm font-extrabold text-cyan-400">{skill.proficiency}%</span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-2.5 rounded-full bg-slate-200/80 dark:bg-slate-800/80 overflow-hidden relative p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-md shadow-cyan-500/50"
                />
              </div>

              <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400 pt-1 uppercase tracking-wider">
                <span>{skill.category}</span>
                {skill.is_featured && (
                  <span className="text-cyan-400 font-semibold">★ Core Tech</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
