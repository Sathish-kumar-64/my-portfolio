import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Target, Compass, Award } from 'lucide-react';
import { portfolioService } from '../../services/portfolioService';

export function AboutPage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    portfolioService.getProfile().then(setProfile);
  }, []);

  const milestones = [
    {
      year: "2023 - Present",
      title: "Senior Full Stack Engineer",
      company: "TechCorp Solutions",
      description: "Leading frontend micro-folder architecture migration to React 19 & Vite, while designing high-performance Django REST microservices."
    },
    {
      year: "2021 - 2022",
      title: "Full Stack Developer",
      company: "Innovate Digital",
      description: "Built scalable web interfaces with React & Tailwind CSS, integrated JWT security policies, and setup GitHub Actions CI/CD."
    },
    {
      year: "2019 - 2021",
      title: "B.Tech in Computer Science & Engineering",
      company: "Anna University",
      description: "Graduated with Distinction. Specialized in Data Structures, Algorithms, Database Normalization, and Software Engineering."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Biography & Career</span>
        <h1 className="text-4xl font-extrabold text-slate-100">About Me</h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          {profile?.bio || "Senior Full Stack Engineer dedicated to designing maintainable, high-performance web systems using React 19, Django REST Framework, and PostgreSQL."}
        </p>
      </div>

      {/* Timeline Journey */}
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <Compass className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-slate-100">Career Journey & Education</h2>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-10">
          {milestones.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors" />

              <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold text-slate-100 pt-1">{item.title}</h3>
                <h4 className="text-sm font-medium text-cyan-400">{item.company}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Career Goals */}
      <div className="max-w-4xl mx-auto glass-panel p-8 rounded-3xl border border-cyan-500/20 space-y-4">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-slate-100">Career Goals & Vision</h2>
        </div>
        <p className="text-slate-300 leading-relaxed">
          My goal is to architect highly resilient cloud platforms that simplify complex business problems. I focus on modular design patterns, micro-folder feature organization, SOLID principles, and clean API design to deliver exceptional developer experiences and end-user productivity.
        </p>
      </div>
    </div>
  );
}
