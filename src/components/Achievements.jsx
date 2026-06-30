import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Trophy } from 'lucide-react';
import usePortfolioData from '../hooks/usePortfolioData';

export default function Achievements() {
  const { data } = usePortfolioData();
  const achievements = data?.achievements || [];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Award':
        return <Award className="text-accent-cyan" size={24} />;
      case 'Shield':
        return <Shield className="text-accent-purple" size={24} />;
      default:
        return <Trophy className="text-accent-green" size={24} />;
    }
  };

  return (
    <section id="achievements" className="py-20 bg-bg-secondary transition-all duration-300">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-accent-cyan uppercase bg-bg-primary px-3 py-1.5 rounded-full">
            Honors
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-4">
            Achievements
          </h2>
          <div className="h-1.5 w-16 bg-accent-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((ach, index) => (
            <motion.div
              key={ach.id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex gap-5 p-6 rounded-2xl bg-bg-card border border-border-custom/30 shadow-custom hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="flex-shrink-0 p-3.5 rounded-xl bg-bg-secondary dark:bg-bg-primary/25 h-fit shadow-sm border border-border-custom/10">
                {getIcon(ach.icon)}
              </div>

              {/* Text info */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-extrabold text-base sm:text-lg text-text-primary">
                    {ach.title}
                  </h3>
                  <span className="text-xs font-mono text-accent-cyan font-bold">
                    {ach.year}
                  </span>
                </div>
                
                <p className="text-sm font-semibold text-text-muted">
                  {ach.organization}
                </p>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-1.5 border-t border-border-custom/10">
                  {ach.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
