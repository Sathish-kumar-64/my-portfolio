import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { portfolioService } from '../../services/portfolioService';
import { SkeletonLoader } from '../../common/components/SkeletonLoader';

export function ExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portfolioService.getExperience().then((res) => {
      setExperiences(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Professional Background</span>
        <h1 className="text-4xl font-extrabold text-slate-100">Work Experience</h1>
        <p className="text-slate-400 text-lg">
          Track record of leading full stack development, architecting REST APIs, and scaling frontend micro-frontends.
        </p>
      </div>

      {loading ? (
        <SkeletonLoader count={3} />
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100">{exp.role}</h3>
                  <div className="text-cyan-400 font-semibold text-base flex items-center gap-2 mt-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-400 sm:text-right">
                  <div className="flex items-center gap-1 sm:justify-end">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:justify-end">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Key Achievements & Impact</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-lg text-xs bg-slate-800/80 text-cyan-300 border border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
