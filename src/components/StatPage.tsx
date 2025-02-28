'use client';
import { useEffect, useState } from 'react';

interface StatPageProps {
  number: string;
  title: string;
  description: string;
  color: string;
  metrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
  chart?: React.ReactNode;
}

export default function StatPage({ number, title, description, color, metrics, chart }: StatPageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="container mx-auto px-8">
      <div 
        className={`max-w-4xl mx-auto space-y-16 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Main Stat */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-2xl blur opacity-25"></div>
          <div className="relative bg-black/50 border border-white/10 rounded-2xl p-12">
            <div className="flex flex-col items-start gap-4">
              <span 
                className={`text-9xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent transform transition-all duration-500 ${
                  isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
              >
                {number}
              </span>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <p className="text-xl text-gray-400 max-w-2xl">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-500 delay-${
                index * 100
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="space-y-2">
                <div className={`text-3xl font-bold ${
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

        {/* Optional Chart */}
        {chart && (
          <div 
            className={`bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 transition-all duration-500 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {chart}
          </div>
        )}
      </div>
    </div>
  );
} 