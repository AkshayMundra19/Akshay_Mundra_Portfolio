import React from 'react';
import { motion } from 'framer-motion';
import { Award, Cpu, FileText, Code, ShieldCheck, ExternalLink } from 'lucide-react';
import usePortfolioData from '../hooks/usePortfolioData';

export default function Certifications() {
  const { data } = usePortfolioData();
  const certifications = data?.certifications || [];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Award':
        return <Award className="text-accent-cyan" size={22} />;
      case 'Cpu':
        return <Cpu className="text-accent-purple" size={22} />;
      case 'FileText':
        return <FileText className="text-accent-green" size={22} />;
      case 'Code':
        return <Code className="text-accent-cyan" size={22} />;
      default:
        return <ShieldCheck className="text-accent-cyan" size={22} />;
    }
  };

  return (
    <section id="certifications" className="py-20 bg-bg-primary transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-accent-cyan uppercase bg-bg-secondary px-3 py-1.5 rounded-full shadow-sm">
            Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-4">
            Certifications
          </h2>
          <div className="h-1.5 w-16 bg-accent-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id || index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-bg-secondary border border-border-custom/30 shadow-custom hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Icon */}
                <div className="p-3 rounded-xl bg-bg-primary dark:bg-bg-primary/20 w-fit">
                  {getIcon(cert.icon)}
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm sm:text-base text-text-primary line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-bold text-text-muted">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              {/* Bottom date banner */}
              <div className="mt-6 pt-3 border-t border-border-custom/10 text-[11px] font-mono text-text-muted flex justify-between items-center">
                <span>Earned: {cert.date_earned}</span>
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-cyan hover:text-accent-purple font-sans font-bold flex items-center gap-0.5 transition-colors text-xs"
                  >
                    <span>Verify</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
