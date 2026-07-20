import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, FolderKanban, FileText, MessageSquare, Plus, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../common/context/AuthContext';
import { portfolioService } from '../../services/portfolioService';

export function AdminDashboardPage() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);

  // Form State for Quick Project Addition
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('fullstack');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    portfolioService.getProjects().then(setProjects);
    portfolioService.getBlogs().then(setBlogs);
  }, []);

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    const newProj = {
      id: Date.now(),
      title: newTitle,
      short_description: newDesc,
      description: newDesc,
      tech_stack: ["React 19", "Django REST"],
      category: newCategory,
      project_status: "completed",
    };
    setProjects([newProj, ...projects]);
    setSuccessMsg("Project added to live local dashboard!");
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-100">Admin Control Panel</h1>
            <p className="text-xs text-cyan-400 font-medium">JWT Authenticated Session</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'projects'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'glass-card text-slate-300 hover:text-cyan-400'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>Projects ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('blogs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'blogs'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'glass-card text-slate-300 hover:text-cyan-400'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Articles ({blogs.length})</span>
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Create Project */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 h-fit">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Plus className="w-5 h-5 text-cyan-400" />
              <span>Add New Project</span>
            </h3>

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleAddProject} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  placeholder="e.g. Cloud ERP Module"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="fullstack">Full Stack</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend API</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold">Short Summary</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  required
                  placeholder="Project goals and stack..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs shadow-md shadow-cyan-500/20 hover:bg-cyan-400 transition-colors"
              >
                Create Project Entry
              </button>
            </form>
          </div>

          {/* Manage Projects Table */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-100">Live Projects Registry</h3>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl glass-card border border-slate-800/80 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{p.title}</h4>
                    <span className="text-xs text-cyan-400 capitalize">{p.category}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700">
                    {p.project_status || 'completed'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'blogs' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-100">Published Blog Articles</h3>
          <div className="space-y-3">
            {blogs.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl glass-card border border-slate-800/80 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{b.title}</h4>
                  <span className="text-xs text-cyan-400">{b.category} • {b.views_count} views</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Published
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
