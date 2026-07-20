import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { portfolioService } from '../../services/portfolioService';
import { SkeletonLoader } from '../../common/components/SkeletonLoader';

export function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portfolioService.getCertificates().then((res) => {
      setCertificates(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Verified Credentials</span>
        <h1 className="text-4xl font-extrabold text-slate-100">Certifications</h1>
        <p className="text-slate-400 text-lg">
          Professional certifications validating technical proficiency in Cloud Architecture, Frontend Engineering, and Full Stack Development.
        </p>
      </div>

      {loading ? (
        <SkeletonLoader type="card" count={3} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -4 }}
              className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Award className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-100">{cert.title}</h3>
                  <p className="text-cyan-400 text-sm font-semibold mt-1">{cert.organization}</p>
                </div>

                <div className="space-y-1 text-xs text-slate-400 border-t border-slate-800/60 pt-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Issued: {cert.issue_date}</span>
                  </div>
                  {cert.credential_id && (
                    <div className="flex items-center gap-1 font-mono text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>ID: {cert.credential_id}</span>
                    </div>
                  )}
                </div>
              </div>

              {cert.credential_url && (
                <div className="pt-6 mt-4 border-t border-slate-800/60">
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-all"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
