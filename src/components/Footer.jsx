import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import logoUrl from '../assets/logo.jpg';
import usePortfolioData from '../hooks/usePortfolioData';

export default function Footer() {
  const { data } = usePortfolioData();
  const user = data?.user || {};
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-bg-primary border-t border-border-custom/30 py-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left copyright branding */}
        <div className="flex flex-col items-center md:items-start gap-2.5">
          <div className="flex items-center gap-2">
            <img 
              src={logoUrl} 
              alt="Akshay Mundra Logo" 
              className="w-7 h-7 rounded-lg object-contain border border-border-custom/20"
            />
            <span className="font-extrabold text-sm tracking-widest text-text-primary uppercase">
              {user.name || 'Akshay Mundra'}
            </span>
          </div>
          <p className="text-xs text-text-muted text-center md:text-left">
            &copy; {currentYear} All rights reserved. Created with React, PHP, &amp; MySQL.
          </p>
        </div>

        {/* Middle quick social shortcuts */}
        <div className="flex gap-4">
          <a
            href={user.github_url || 'https://github.com/AkshayMundra19'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-bg-secondary hover:bg-accent-cyan hover:text-white dark:bg-bg-card dark:hover:bg-accent-cyan text-text-secondary transition-all duration-300 shadow-sm border border-border-custom/10"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={user.linkedin_url || 'https://linkedin.com/in/akshay-mundra0101'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-bg-secondary hover:bg-accent-cyan hover:text-white dark:bg-bg-card dark:hover:bg-accent-cyan text-text-secondary transition-all duration-300 shadow-sm border border-border-custom/10"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={user.twitter_url || 'https://x.com/AkshayMundra111'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-bg-secondary hover:bg-accent-cyan hover:text-white dark:bg-bg-card dark:hover:bg-accent-cyan text-text-secondary transition-all duration-300 shadow-sm border border-border-custom/10 flex items-center justify-center"
            aria-label="Twitter / X"
          >
            <svg 
              viewBox="0 0 24 24" 
              width={18} 
              height={18} 
              fill="currentColor"
              className="inline-block"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href={`mailto:${user.email || 'akshaymundra07@gmail.com'}`}
            className="p-2.5 rounded-full bg-bg-secondary hover:bg-accent-cyan hover:text-white dark:bg-bg-card dark:hover:bg-accent-cyan text-text-secondary transition-all duration-300 shadow-sm border border-border-custom/10"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Right back to top toggle shortcut */}
        <button
          onClick={handleScrollToTop}
          className="text-xs font-mono font-bold text-text-secondary hover:text-accent-cyan transition-colors flex items-center gap-1.5 cursor-pointer border-0 outline-none"
          aria-label="Scroll back to top"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} />
        </button>

      </div>
    </footer>
  );
}
