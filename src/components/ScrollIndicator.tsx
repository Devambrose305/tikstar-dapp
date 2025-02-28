'use client';
import { useEffect, useState } from 'react';

export default function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState(0);
  const sections = ['Home', 'Vision', 'Tokenomics', 'Stats', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const currentSection = Math.round(scrollPosition / windowHeight);
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {sections.map((section, index) => (
        <button
          key={section}
          onClick={() => scrollToSection(index)}
          className="group relative"
        >
          <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
            activeSection === index 
              ? 'bg-gradient-to-r from-brand-cyan to-brand-pink scale-125' 
              : 'bg-white/20 scale-100'
          }`} />
          <span className={`absolute right-full transform -translate-y-1/2 top-1/2 pr-4 text-sm whitespace-nowrap transition-all duration-300 ${
            activeSection === index
              ? 'opacity-100 -translate-x-0'
              : 'opacity-0 translate-x-4'
          } ${
            index === activeSection 
              ? 'text-white' 
              : 'text-gray-400'
          }`}>
            {section}
          </span>
          <div className={`absolute right-full top-1/2 -translate-y-1/2 w-16 h-0.5 transform scale-x-0 transition-transform duration-300 origin-right ${
            activeSection === index
              ? 'bg-gradient-to-r from-brand-cyan to-brand-pink'
              : 'bg-white/20'
          } group-hover:scale-x-100`} />
        </button>
      ))}
    </div>
  );
} 