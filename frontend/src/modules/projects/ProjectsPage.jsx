import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Github, ExternalLink, Code2, CheckCircle2, X } from 'lucide-react';
import { portfolioService } from '../../services/portfolioService';
import { SkeletonLoader } from '../../common/components/SkeletonLoader';

export function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);

  useEffect(() => {
    portfolioService.getProjects().then((res) => {
      setProjects(res);
      setLoading(false);
    });
  }, []);

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'fullstack', label: 'Full Stack' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend API' },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tech_stack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Software Portfolio</span>
        <h1 className="text-4xl font-extrabold text-slate-100">Featured Projects</h1>
        <p className="text-slate-400 text-lg">
          Live web applications, backend REST microservices, and enterprise tools engineered with clean architecture.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects or tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.key
                  ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-cyan-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <SkeletonLoader type="card" count={6} />
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-16 glass-card rounded-2xl border border-slate-800">
          <Code2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-slate-300">No projects found</h3>
          <p className="text-slate-500 text-sm mt-1">Try adjusting your search query or filter selection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedProjectModal(project)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-xs text-slate-400 capitalize">{project.project_status.replace('_', ' ')}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {project.short_description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech_stack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-md text-xs bg-slate-800 text-slate-300 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/60 mt-6 flex items-center justify-between text-xs">
                <span className="text-cyan-400 font-semibold flex items-center gap-1">
                  <span>View Details</span>
                </span>
                <div className="flex items-center gap-3">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-400"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.live_demo_url && (
                    <a
                      href={project.live_demo_url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-400"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel w-full max-w-2xl p-8 rounded-3xl border border-cyan-500/30 space-y-6 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="absolute top-6 right-6 p-2 rounded-xl glass-card text-slate-400 hover:text-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                  {selectedProjectModal.category}
                </span>
                <h2 className="text-2xl font-black text-slate-100">{selectedProjectModal.title}</h2>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedProjectModal.description}
              </p>

              {/* Key Features List */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Key Features</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {selectedProjectModal.features?.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectModal.tech_stack.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-lg text-xs bg-slate-800/80 text-cyan-300 font-semibold border border-cyan-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                {selectedProjectModal.github_url && (
                  <a
                    href={selectedProjectModal.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl glass-card text-xs font-semibold text-slate-200 hover:text-cyan-400 flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedProjectModal.live_demo_url && (
                  <a
                    href={selectedProjectModal.live_demo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
