import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#07090e]/90 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/60">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-black text-sm">
                SK
              </div>
              <span className="text-lg font-bold text-slate-100">Sathish Kumar</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Senior Full Stack Developer specializing in building scalable web architectures using React 19, Django REST Framework, PostgreSQL, and Cloud microservices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><NavLink to="/about" className="hover:text-cyan-400 transition-colors">About Me</NavLink></li>
              <li><NavLink to="/skills" className="hover:text-cyan-400 transition-colors">Technical Skills</NavLink></li>
              <li><NavLink to="/projects" className="hover:text-cyan-400 transition-colors">Featured Projects</NavLink></li>
              <li><NavLink to="/experience" className="hover:text-cyan-400 transition-colors">Experience</NavLink></li>
              <li><NavLink to="/blog" className="hover:text-cyan-400 transition-colors">Articles & Blogs</NavLink></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Connect</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/sathishkumar"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl glass-card text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/sathishkumar"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl glass-card text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:sathish.kumar@example.com"
                className="p-2.5 rounded-xl glass-card text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Sathish Kumar. All rights reserved.</p>
          
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>React 19 & Django REST</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <span>Back To Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
