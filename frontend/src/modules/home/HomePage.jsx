import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  Download, Mail, Github, Linkedin, Briefcase, Award, Code2, Users, ArrowRight 
} from 'lucide-react';
import { TypingAnimation } from '../../common/components/TypingAnimation';
import { StatCard } from '../../common/components/StatCard';
import { portfolioService } from '../../services/portfolioService';

export function HomePage() {
  const [profile, setProfile] = useState(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    portfolioService.getProfile().then(setProfile);
    portfolioService.getProjects({ is_featured: true }).then((res) => {
      setFeaturedProjects(res.slice(0, 3));
    });
  }, []);

  const roles = [
    "Senior Full Stack Developer",
    "Django REST API Architect",
    "React 19 Frontend Engineer",
    "PostgreSQL & Cloud Specialist"
  ];

  return (
    <div className="space-y-24 py-10">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-2xl text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
            Available For New Projects & Roles
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            Hi, I'm <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-indigo-400 bg-clip-text text-transparent">{profile?.full_name || 'Sathish Kumar'}</span>
          </h1>

          <div className="text-xl sm:text-2xl font-medium text-slate-700 dark:text-slate-300 h-10 flex items-center">
            <TypingAnimation words={roles} speed={80} pause={2200} />
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            {profile?.bio || 'Passionate Full Stack Engineer with expertise in building scalable web applications using React 19, Django REST Framework, PostgreSQL, and Cloud microservices. Dedicated to SOLID design principles and clean architecture.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <NavLink
              to="/contact"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-600 text-white dark:text-black font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 hover:scale-[1.02] transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Hire Me / Contact</span>
            </NavLink>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Downloading Resume... (Attach resume PDF link in admin)");
              }}
              className="px-6 py-3.5 rounded-xl glass-card text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/40 hover:bg-white/90 dark:hover:bg-white/10 text-sm font-semibold flex items-center gap-2 hover:scale-[1.02] shadow-sm dark:shadow-none transition-all"
            >
              <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Download Resume</span>
            </a>

            <div className="flex items-center gap-2 ml-auto sm:ml-0">
              <a
                href="https://github.com/sathishkumar"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl glass-card text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/sathishkumar"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl glass-card text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Profile Avatar Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 dark:opacity-30 group-hover:opacity-40 dark:group-hover:opacity-60 blur-xl transition duration-500" />
          <div className="relative w-72 sm:w-80 h-96 rounded-3xl glass-panel p-4 border border-cyan-500/20 dark:border-cyan-500/30 flex flex-col justify-between overflow-hidden shadow-2xl shadow-cyan-500/5 dark:shadow-cyan-900/20">
            <div className="w-full h-64 rounded-2xl bg-white dark:bg-gradient-to-tr dark:from-slate-900 dark:via-slate-800 dark:to-cyan-950 flex items-center justify-center border border-slate-100 dark:border-slate-700/60 overflow-hidden relative group-hover:scale-[1.02] transition-transform">
              <img src="/profile.jpg" alt="Sathish Kumar" className="w-full h-full object-cover object-top" />
            </div>

            <div className="pt-3 text-center space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Sathish Kumar</h3>
              <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">Senior Full Stack Architect</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Statistics Counter Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard label="Years Experience" value={profile?.years_experience || 5} icon={Briefcase} />
          <StatCard label="Projects Completed" value={profile?.projects_completed || 30} icon={Code2} />
          <StatCard label="Tech Stack Mastered" value={profile?.technologies_mastered || 18} icon={Award} />
          <StatCard label="Happy Clients" value={profile?.happy_clients || 15} icon={Users} />
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between border-b border-slate-800/80 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Portfolio Highlights</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">Featured Work</h2>
          </div>
          <NavLink to="/projects" className="flex items-center gap-1 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -6 }}
              className="glass-card bg-white/70 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-lg shadow-slate-200/50 dark:shadow-none"
            >
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20 uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed">
                  {project.short_description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech_stack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800/60 mt-6 flex items-center justify-between text-xs">
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1 font-medium"
                >
                  <Github className="w-4 h-4" />
                  <span>Repository</span>
                </a>
                <a
                  href={project.live_demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Live Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
