import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Zap, Terminal } from 'lucide-react';
import usePortfolioData from '../hooks/usePortfolioData';

export default function About() {
  const { data } = usePortfolioData();
  const user = data?.user || {};

  const traits = [
    {
      icon: <Brain className="text-accent-cyan" size={24} />,
      title: "AI & ML Driven",
      description: "Applying Gemini APIs, Generative AI, and Machine Learning workflows to build context-aware automated solutions."
    },
    {
      icon: <Code className="text-accent-purple" size={24} />,
      title: "Full-Stack Scripting",
      description: "Developing robust backends using FastAPI, Python, and SQL, coupled with interactive React client frontends."
    },
    {
      icon: <Zap className="text-accent-green" size={24} />,
      title: "Workflow Automation",
      description: "Building custom scripts to automate tedious administrative steps (e.g. multiple ID card generators, file parsers)."
    }
  ];

  return (
    <section id="about" className="py-24 bg-bg-secondary transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-accent-cyan uppercase bg-bg-primary px-3 py-1.5 rounded-full">
            Introduction
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-4">
            About Akshay Mundra
          </h2>
          <div className="h-1.5 w-16 bg-accent-cyan mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Biography text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-6 text-text-secondary"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
              <Terminal size={22} className="text-accent-cyan" />
              <span>Building the future with code</span>
            </h3>
            
            <p className="text-base sm:text-lg leading-relaxed">
              {user.bio_para1 || "I'm a Python Developer and AI Enthusiast pursuing B.Tech in Computer Science at Poornima College of Engineering, Jaipur (2024–2028). I build full-stack web applications and AI-powered automation tools that solve real problems."}
            </p>
            
            <p className="text-base sm:text-lg leading-relaxed">
              {user.bio_para2 || "With hands-on experience at Renao Robotics as a Python Developer Intern and projects recognized at IIT Bombay's AI Eduthon and Smart India Hackathon 2025, I bring both technical depth and a product mindset to everything I build."}
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-bg-primary/50 dark:bg-bg-primary/10 border border-border-custom/30">
                <span className="block text-xs font-mono text-text-muted">LOCATION</span>
                <span className="font-semibold text-text-primary">{user.location || "Jaipur, Rajasthan, India"}</span>
              </div>
              <div className="p-4 rounded-xl bg-bg-primary/50 dark:bg-bg-primary/10 border border-border-custom/30">
                <span className="block text-xs font-mono text-text-muted">EMAIL</span>
                <a href={`mailto:${user.email || 'akshaymundra07@gmail.com'}`} className="font-semibold text-accent-cyan hover:underline break-all">
                  {user.email || "akshaymundra07@gmail.com"}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Traits / Highlights */}
          <div className="md:col-span-5 space-y-6">
            {traits.map((trait, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex gap-4 p-5 rounded-2xl bg-bg-card hover:bg-bg-primary/45 dark:bg-bg-card/30 dark:hover:bg-bg-card/65 border border-border-custom/30 shadow-custom hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-bg-primary dark:bg-bg-primary/20 h-fit">
                  {trait.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-text-primary">{trait.title}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{trait.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
