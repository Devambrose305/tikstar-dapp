'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface StatsButtonProps {
  href: string;
  number: string;
  label: string;
  subLabel: string;
  color: string;
}

export default function StatsButton({ href, number, label, subLabel, color }: StatsButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await router.push(href);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <button 
        onClick={handleClick}
        className="group relative w-full text-left cursor-pointer overflow-hidden rounded-xl"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
        <div className="relative bg-black/60 backdrop-blur-sm rounded-xl p-8 border border-white/10 transform transition-all duration-500 group-hover:scale-[1.02] group-hover:border-brand-cyan/50">
          <div className="space-y-2">
            <div className="flex items-baseline gap-1">
              <span className={`text-7xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                {number}
              </span>
              <span className={`${color.includes('brand-cyan') ? 'text-brand-cyan' : color.includes('brand-pink') ? 'text-brand-pink' : 'text-white'} text-2xl`}>
                +
              </span>
            </div>
            <div className="text-gray-300 font-medium text-lg">{label}</div>
            <div className={`${color.includes('brand-cyan') ? 'text-brand-cyan' : color.includes('brand-pink') ? 'text-brand-pink' : 'text-gray-400'} text-sm`}>
              {subLabel}
            </div>
          </div>
        </div>
      </button>
    </>
  );
} 