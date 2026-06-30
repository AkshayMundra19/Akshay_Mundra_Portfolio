import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      if (height > 0) {
        setWidth((scrolled / height) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[4px] bg-transparent z-[9999]">
      <div 
        className="h-full bg-accent-cyan transition-all duration-75 ease-out shadow-[0_0_10px_rgba(8,145,178,0.5)]" 
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
