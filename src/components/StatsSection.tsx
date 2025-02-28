'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface StatsSectionProps {
  number: string;
  title: string;
  description: string;
  color: string;
  metrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
  isFirst?: boolean;
  isLast?: boolean;
}

export default function StatsSection({ 
  number, 
  title, 
  description, 
  color, 
  metrics,
  isFirst,
  isLast 
}: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(number);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
      animateNumber();
    }
  }, [inView]);

  const animateNumber = () => {
    const target = parseInt(number.replace(/,/g, ''));
    const duration = 1500;
    const steps = 60;
    const stepValue = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= target) {
        setDisplayNumber(number);
        clearInterval(timer);
      } else {
        setDisplayNumber(Math.floor(current).toLocaleString());
      }
    }, duration / steps);
  };

  return (
    <div ref={ref} className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-2xl blur opacity-25"></div>
        <div className="relative bg-black/50 border border-white/10 rounded-2xl p-12">
          <div className="flex flex-col items-start gap-4">
            <span suppressHydrationWarning className={`text-9xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
              {displayNumber}
            </span>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">{title}</h2>
              <p className="text-xl text-gray-400 max-w-2xl">{description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6"
          >
            <div className="space-y-2">
              <div suppressHydrationWarning className={`text-3xl font-bold ${
                color.includes('brand-cyan') ? 'text-brand-cyan' : 
                color.includes('brand-pink') ? 'text-brand-pink' : 
                'text-white'
              }`}>
                {metric.value}
              </div>
              <div className="text-gray-300">{metric.label}</div>
              <div className="text-sm text-gray-500">{metric.subtext}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 