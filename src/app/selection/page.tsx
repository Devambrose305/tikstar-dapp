'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Selection() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSelection = (role: 'brand' | 'influencer' | 'participant') => {
    setIsLoading(true);
    switch (role) {
      case 'brand':
        router.push('/register/brand');
        break;
      case 'influencer':
        router.push('/register/influencer');
        break;
      case 'participant':
        router.push('/register/participant');
        break;
    }
  };

  return (
    <main className="min-h-screen bg-black font-sans antialiased">
      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="w-full px-0">
          <div className="flex items-center pl-8 h-20">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-full blur-md opacity-40 group-hover:opacity-75 transition-opacity"></div>
                <Image
                  src="/images/logo.png"
                  alt="TikStar Logo"
                  width={56}
                  height={56}
                  priority
                  className="relative transform hover:scale-105 transition-all duration-300"
                />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                TikStar
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-12">Choose Your Role</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Owner */}
            <button
              onClick={() => handleSelection('brand')}
              className="relative group p-8 rounded-xl bg-black/50 border border-white/10"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-cyan rounded-xl blur opacity-50 group-hover:opacity-100 transition"></div>
              <div className="relative space-y-4">
                <div className="w-16 h-16 bg-brand-cyan/20 rounded-full mx-auto flex items-center justify-center">
                  <svg className="w-8 h-8 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white text-center">Brand Owner</h3>
                <p className="text-gray-400 text-center">Connect with influencers and grow your brand</p>
              </div>
            </button>

            {/* Influencer */}
            <button
              onClick={() => handleSelection('influencer')}
              className="relative group p-8 rounded-xl bg-black/50 border border-white/10"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-pink to-brand-pink rounded-xl blur opacity-50 group-hover:opacity-100 transition"></div>
              <div className="relative space-y-4">
                <div className="w-16 h-16 bg-brand-pink/20 rounded-full mx-auto flex items-center justify-center">
                  <svg className="w-8 h-8 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white text-center">Influencer</h3>
                <p className="text-gray-400 text-center">Monetize your influence with TSC tokens</p>
              </div>
            </button>

            {/* Participant */}
            <button
              onClick={() => handleSelection('participant')}
              className="relative group p-8 rounded-xl bg-black/50 border border-white/10"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-gray-400 rounded-xl blur opacity-50 group-hover:opacity-100 transition"></div>
              <div className="relative space-y-4">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white text-center">Participant</h3>
                <p className="text-gray-400 text-center">Join the ecosystem and invest in TSC</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 