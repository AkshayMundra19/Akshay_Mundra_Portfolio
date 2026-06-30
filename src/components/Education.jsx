import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';
import usePortfolioData from '../hooks/usePortfolioData';

export default function Education() {
  const { data } = usePortfolioData();
  const education = data?.education || [];

  return (
    <section id="education" className="py-20 bg-bg-primary transition-all duration-300">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-accent-cyan uppercase bg-bg-secondary px-3 py-1.5 rounded-full shadow-sm">
            Academics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-4">
            Education
          </h2>
          <div className="h-1.5 w-16 bg-accent-cyan mx-auto mt-4 rounded-full" />
        </div>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-6 sm:p-8 rounded-2xl bg-bg-secondary border border-border-custom/30 shadow-custom hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start"
            >
              {/* Left icon */}
              <div className="p-4 rounded-xl bg-bg-primary text-accent-cyan dark:bg-bg-primary/20">
                <GraduationCap size={28} />
              </div>

              {/* Middle details */}
              <div className="flex-grow space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold text-text-primary">
                    {edu.degree}
                  </h3>
                  
                  {/* Status Badge */}
                  {edu.status === 'Ongoing' ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/30 text-accent-cyan text-xs font-semibold border border-cyan-200 dark:border-cyan-800 animate-pulse">
                      Currently Enrolled
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-accent-green text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
                      {edu.status}
                    </span>
                  )}
                </div>

                <p className="text-text-secondary font-semibold text-base flex items-center gap-1.5">
                  <BookOpen size={16} className="text-text-muted" />
                  <span>{edu.institution}</span>
                </p>

                {/* Calendar Years */}
                <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                  <Calendar size={14} />
                  <span>
                    {edu.start_year} &mdash; {edu.end_year || 'Present'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
