import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import usePortfolioData from './hooks/usePortfolioData';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import LoadingSkeleton from './components/LoadingSkeleton';

function AppContent() {
  const { loading } = usePortfolioData();

  // Show skeletal structures during initial API fetch latency
  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
