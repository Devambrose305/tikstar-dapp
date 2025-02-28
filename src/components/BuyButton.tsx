'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function BuyButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await router.push('/buy');
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <button 
        onClick={handleClick}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-xl blur opacity-60 group-hover:opacity-100 transition"></div>
        <div className="relative px-8 py-4 bg-black rounded-xl leading-none flex items-center">
          <span className="text-white text-lg font-medium">Buy TSC</span>
          <span className="ml-2 text-xl group-hover:translate-x-1 transition-transform">›</span>
        </div>
      </button>
    </>
  );
} 