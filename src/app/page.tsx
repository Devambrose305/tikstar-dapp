'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StatsButton from '@/components/StatsButton';
import BuyButton from '@/components/BuyButton';
import StatsSection from '@/components/StatsSection';
import ScrollIndicator from '@/components/ScrollIndicator';
import ConnectWallet from '@/components/ConnectWallet';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Enable smooth scrolling
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = 'smooth';
    }
  }, []);

  const stats = [
    {
      number: "793",
      title: "Active TikTok Influencers",
      description: "Growing community of content creators leveraging blockchain technology to monetize their influence.",
      color: "from-brand-cyan to-white",
      metrics: [
        {
          label: "Growth Rate",
          value: "45%",
          subtext: "Monthly increase"
        },
        {
          label: "Average Followers",
          value: "2.5M",
          subtext: "Per influencer"
        },
        {
          label: "Engagement Rate",
          value: "85%",
          subtext: "Platform average"
        }
      ]
    },
    {
      number: "66",
      title: "Brand Partners",
      description: "Leading brands leveraging the TikStar ecosystem for enhanced influencer marketing.",
      color: "from-brand-pink to-white",
      metrics: [
        {
          label: "Total Investment",
          value: "$2.8M",
          subtext: "Committed funds"
        },
        {
          label: "ROI Increase",
          value: "32%",
          subtext: "Average growth"
        },
        {
          label: "Active Campaigns",
          value: "150+",
          subtext: "Monthly campaigns"
        }
      ]
    },
    {
      number: "570,838",
      title: "TSC Sold",
      description: "Current presale progress and token distribution metrics showing strong market confidence.",
      color: "from-white to-gray-400",
      metrics: [
        {
          label: "Presale Progress",
          value: "57.08%",
          subtext: "Of total supply"
        },
        {
          label: "Token Price",
          value: "0.05 USDT",
          subtext: "Current rate"
        },
        {
          label: "Total Value",
          value: "$1.42M",
          subtext: "Locked value"
        }
      ]
    }
  ];

  if (!mounted) {
    return null; // Return null on server-side to prevent hydration mismatch
  }

  return (
    <main className="min-h-screen bg-black font-sans antialiased">
      {/* Fixed Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="w-full px-0">
          <div className="flex items-center pl-8 h-20">
            {/* Logo Only */}
            <div className="flex items-center gap-4 group mr-16">
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-full blur-md opacity-40 group-hover:opacity-75 transition-opacity"></div>
                <Image
                  src="/images/logo.png"
                  alt="TikStar Logo"
                  width={80}
                  height={80}
                  priority
                  className="relative transform hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-brand-cyan to-white bg-clip-text text-transparent">
                  TikStar
                </span>
                <span className="text-2xl font-bold bg-gradient-to-r from-brand-pink to-white bg-clip-text text-transparent">
                  Coin
                </span>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="flex items-center justify-between flex-1">
              {/* Main Navigation */}
              <div className="flex items-center gap-12">
                <Link 
                  href="#vision" 
                  className="relative group py-2"
                >
                  <span className="text-gray-400 group-hover:text-white text-lg font-medium transition-colors">
                    Vision
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
                <Link 
                  href="#tokenomics" 
                  className="relative group py-2"
                >
                  <span className="text-gray-400 group-hover:text-white text-lg font-medium transition-colors">
                    Tokenomics
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
                <Link 
                  href="#stats" 
                  className="relative group py-2"
                >
                  <span className="text-gray-400 group-hover:text-white text-lg font-medium transition-colors">
                    Stats
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-6 pr-8">
                {/* Language Selector */}
                <button className="text-lg text-gray-400 hover:text-white transition-colors">
                  EN / 中文
                </button>

                <div className="h-6 w-px bg-gray-800"></div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                  {/* Sign Up Button */}
                  <Link href="/signup" className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-lg blur opacity-50 group-hover:opacity-100 transition"></div>
                    <div className="relative px-5 py-2.5 bg-black rounded-lg leading-none flex items-center">
                      <span className="text-white text-lg font-medium">Sign Up</span>
                    </div>
                  </Link>

                  {/* Login Button */}
                  <Link href="/login" className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-pink to-brand-pink rounded-lg blur opacity-50 group-hover:opacity-100 transition"></div>
                    <div className="relative px-5 py-2.5 bg-black rounded-lg leading-none flex items-center">
                      <span className="text-white text-lg font-medium">Login</span>
                    </div>
                  </Link>

                  {/* Connect Wallet Button */}
                  <ConnectWallet 
                    onConnect={(address) => {
                      console.log('Connected wallet:', address);
                      // You can add additional logic here if needed
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Scrollable Content */}
      <div className="pt-20">
        <ScrollIndicator />

        {/* Hero Section */}
        <section id="home" className="min-h-screen py-32">
          <div className="w-full">
            <div className="relative max-w-[1920px] mx-auto">
              <div className="grid lg:grid-cols-[1fr,600px] items-center">
                {/* Left Content */}
                <div className="relative z-10 space-y-16 pl-20">
                  {/* Main Title Section */}
                  <div className="relative space-y-12 animate-fade-in-up">
                    {/* Title Group */}
                    <div className="space-y-6">
                      <h1 className="space-y-4">
                        <div className="text-8xl font-bold tracking-tight overflow-hidden">
                          <span className="inline-block animate-slide-up delay-100">
                            <span className="bg-gradient-to-r from-brand-cyan to-white bg-clip-text text-transparent inline-block">
                              TikStar
                            </span>
                          </span>
                          <span className="inline-block animate-slide-up delay-200 ml-4">
                            <span className="bg-gradient-to-r from-brand-pink to-white bg-clip-text text-transparent inline-block">
                              Coin
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-8 animate-fade-in delay-300">
                          <div className="h-1 w-40 bg-gradient-to-r from-brand-cyan to-brand-pink animate-width"></div>
                          <span className="text-gray-400 text-7xl tracking-wider font-bold bg-gradient-to-r from-brand-cyan to-brand-pink bg-clip-text text-transparent transform hover:scale-105 transition-all duration-300">(TSC)</span>
                          <div className="h-1 w-40 bg-gradient-to-r from-brand-pink to-brand-cyan animate-width"></div>
                        </div>
                      </h1>
                    </div>

                    {/* Description Group */}
                    <div className="max-w-2xl space-y-8 animate-fade-in delay-400">
                      <h2 className="text-4xl font-bold leading-tight bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent transform hover:scale-[1.02] transition-transform">
                        A Decentralized and Permanent TikTok Influencer Economy Network
                      </h2>
                      
                      {/* Value Proposition Box */}
                      <div className="relative group mt-8 transform hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan/20 to-brand-pink/20 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
                        <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 group-hover:border-white/20 transition-colors">
                          <div className="flex flex-col gap-6">
                            {/* Value Proposition */}
                            <div className="flex items-start gap-4">
                              <div className="w-1 h-16 bg-brand-cyan/20 rounded-full animate-pulse-slow"></div>
                              <div className="flex flex-col">
                                <h3 className="text-2xl font-bold text-brand-cyan mb-2">TikStarCoin Value Proposition</h3>
                                <div className="text-xl leading-relaxed text-gray-300">
                                  Revolutionizing the TikTok influencer economy through blockchain technology and decentralized monetization.
                                </div>
                              </div>
                            </div>
                            {/* Value Support */}
                            <div className="flex items-start gap-4">
                              <div className="w-1 h-16 bg-brand-pink/20 rounded-full animate-pulse-slow"></div>
                              <div className="flex flex-col">
                                <h3 className="text-2xl font-bold text-brand-pink mb-2">TikStarCoin Value Support</h3>
                                <div className="text-xl leading-relaxed text-gray-300">
                                  Backed by 5% of all sales revenue from brand collaborations and influencer promotions on the platform.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Stats Grid */}
                  <div className="grid grid-cols-3 gap-8 mt-16">
                    <StatsButton 
                      href="/stats/influencers"
                      number="793"
                      label="Active Influencers"
                      subLabel="Growing Daily"
                      color="from-brand-cyan to-white"
                    />
                    <StatsButton 
                      href="/stats/partners"
                      number="66"
                      label="Brand Partners"
                      subLabel="Expanding Network"
                      color="from-brand-pink to-white"
                    />
                    <StatsButton 
                      href="/stats/sales"
                      number="570,838"
                      label="TSC Sold"
                      subLabel="Limited Supply"
                      color="from-white to-gray-400"
                    />
                  </div>

                  {/* CTA Section */}
                  <div className="space-y-4 mt-12">
                    <div className="flex items-center gap-12">
                      <BuyButton />
                      <div className="transform hover:scale-105 transition-all duration-300">
                        <div className="text-3xl font-bold text-brand-cyan">0.05 USDT</div>
                        <div className="text-gray-400 text-lg">Presale Price</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Content - Animated Logo */}
                <div className="relative h-full w-[600px] flex items-center">
                  <div className="relative w-[500px] aspect-square">
                    {/* Professional Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/95 to-black/90 rounded-l-3xl"></div>
                    
                    {/* Subtle Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] rounded-l-3xl"></div>
                    
                    {/* Logo Container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative group" style={{ animationDuration: '6s' }}>
                        {/* Subtle Glow Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan/30 to-brand-pink/30 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                        
                        {/* Logo */}
                        <div className="relative">
                          <Image
                            src="/images/logo.png"
                            alt="TikStar Logo"
                            width={400}
                            height={400}
                            priority
                            className="transform group-hover:scale-[1.02] transition-transform duration-700"
                          />
                        </div>

                        {/* Professional Orbital Rings */}
                        <div className="absolute -inset-12 flex items-center justify-center opacity-30">
                          <div className="w-full h-full border border-white/10 rounded-full animate-spin-slow"></div>
                        </div>
                        <div className="absolute -inset-16 flex items-center justify-center opacity-20">
                          <div className="w-full h-full border border-white/5 rounded-full animate-spin-slow-reverse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Subtle Accent Lights */}
                    <div className="absolute top-10 right-10 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-10 left-10 w-32 h-32 bg-brand-pink/5 rounded-full blur-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="min-h-screen py-32">
          <div className="w-full pl-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16">
                {/* Vision Content */}
                <div className="space-y-12">
                  <h2 className="text-7xl font-bold text-white">Future Vision</h2>
                  <p className="text-3xl font-semibold leading-relaxed bg-gradient-to-r from-brand-cyan via-white to-brand-pink bg-clip-text text-transparent transform hover:scale-[1.02] transition-transform relative group">
                    Building the world's largest Web 3.0 decentralized influencer economy ecosystem
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan/20 to-brand-pink/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </p>
                  
                  {/* Vision Stats */}
                  <div className="grid grid-cols-2 gap-8 mt-16">
                    {/* Influencer Target */}
                    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-brand-cyan/50 transition-colors">
                      <div className="text-5xl font-bold text-brand-cyan mb-3">50,000+</div>
                      <div className="text-lg text-gray-400">Target Influencers</div>
                    </div>
                    {/* Brand Target - New */}
                    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-brand-pink/50 transition-colors">
                      <div className="text-5xl font-bold text-brand-pink mb-3">5,000+</div>
                      <div className="text-lg text-gray-400">Brand Merchants</div>
                    </div>
                    {/* Sales Target */}
                    <div className="col-span-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-white/30 transition-colors">
                      <div className="text-5xl font-bold bg-gradient-to-r from-brand-cyan to-brand-pink text-transparent bg-clip-text mb-3">$1B+</div>
                      <div className="text-lg text-gray-400">Sales Volume Goal</div>
                    </div>
                  </div>
                </div>

                {/* Roadmap */}
                <div className="space-y-8">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-2xl blur opacity-25"></div>
                    <div className="relative bg-black/50 border border-white/10 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold text-white mb-6">Roadmap</h3>
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <div className="w-24 text-brand-cyan">2025 Q2</div>
                          <div className="text-gray-300">Platform Launch & Initial Partnerships</div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-24 text-brand-pink">2025 Q3</div>
                          <div className="text-gray-300">Ecosystem Expansion & Feature Development</div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-24 text-white">2025 Q4</div>
                          <div className="text-gray-300">Global Market Expansion</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="min-h-screen py-32 relative">
          <div className="max-w-6xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-7xl font-bold text-white mb-6">Core Values</h2>
              <p className="text-2xl text-gray-400">Empowering the Web3 Social Economy</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* TikTok Influencers */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-cyan/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative h-full bg-black/50 border border-white/10 rounded-2xl p-8 hover:border-brand-cyan/50 transition-colors">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">TikTok Influencers</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-2"></div>
                        <p className="text-gray-300">Permanently record traffic value and influence assets on the blockchain through TSC</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-2"></div>
                        <p className="text-gray-300">Enable decentralized commercial monetization</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-2"></div>
                        <p className="text-gray-300">Share revenue rights from brand collaborations</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-2"></div>
                        <p className="text-gray-300">Gain additional income sources</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Merchants */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-pink to-brand-pink/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative h-full bg-black/50 border border-white/10 rounded-2xl p-8 hover:border-brand-pink/50 transition-colors">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-pink/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-brand-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">Brand Merchants</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-2"></div>
                        <p className="text-gray-300">Pay influencer service fees using TSC</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-2"></div>
                        <p className="text-gray-300">Enjoy lower costs and more efficient marketing services</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-2"></div>
                        <p className="text-gray-300">Receive TSC airdrops</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-2"></div>
                        <p className="text-gray-300">Participate in ecosystem governance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fans & Users */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-gray-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative h-full bg-black/50 border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-300">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">Fans & Users</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-2"></div>
                        <p className="text-gray-300">Access exclusive influencer content</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-2"></div>
                        <p className="text-gray-300">Enjoy special discounts on brand products</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-2"></div>
                        <p className="text-gray-300">Participate in free product giveaways</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-2"></div>
                        <p className="text-gray-300">Benefit from potential TSC value appreciation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tokenomics Section */}
        <section id="tokenomics" className="min-h-screen py-32">
          <div className="max-w-6xl mx-auto px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-7xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-6">
                  Tokenomics
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  TikStarCoin (TSC) implements a sustainable and balanced token economic model
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-16">
                {/* Token Info */}
                <div className="space-y-8">
                  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Token Details</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Name</span>
                        <span className="text-white">TikStarCoin (TSC)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Network</span>
                        <span className="text-white">BSC (BEP-20)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Supply</span>
                        <span className="text-white">1,000,000,000 TSC</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Initial Price</span>
                        <span className="text-brand-cyan">0.05 USDT</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Distribution */}
                <div className="space-y-8">
                  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Token Distribution Details</h3>
                    <div className="space-y-6">
                      {/* Ecological Fund */}
                      <div className="p-4 border border-white/10 rounded-xl hover:border-brand-cyan/50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">Ecological Fund</span>
                          <span className="text-brand-cyan">20%</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">Tech development, market promotion, operational costs</p>
                        <p className="text-gray-500 text-sm">Release: 4-year linear unlocking</p>
                      </div>

                      {/* Brand Merchant Pool */}
                      <div className="p-4 border border-white/10 rounded-xl hover:border-brand-pink/50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">Brand Merchant Airdrop Pool</span>
                          <span className="text-brand-pink">15%</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">Airdrops based on service fees</p>
                        <p className="text-gray-500 text-sm">Release: According to progress</p>
                      </div>

                      {/* Influencer Pool */}
                      <div className="p-4 border border-white/10 rounded-xl hover:border-brand-cyan/50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">Influencer Airdrop Pool</span>
                          <span className="text-brand-cyan">15%</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">Airdrops based on follower count</p>
                        <p className="text-gray-500 text-sm">Release: Unlocks based on contract terms</p>
                      </div>

                      {/* Presale */}
                      <div className="p-4 border border-white/10 rounded-xl hover:border-brand-pink/50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">Presale Financing</span>
                          <span className="text-brand-pink">30%</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">Financing needs of brand merchants</p>
                        <p className="text-gray-500 text-sm">Release: Locked for 6 months then released</p>
                      </div>

                      {/* Community */}
                      <div className="p-4 border border-white/10 rounded-xl hover:border-brand-cyan/50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">Community Incentives & Airdrops</span>
                          <span className="text-brand-cyan">10%</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">Fan activities, early participants rewards</p>
                        <p className="text-gray-500 text-sm">Release: Instant release</p>
                      </div>

                      {/* Liquidity */}
                      <div className="p-4 border border-white/10 rounded-xl hover:border-brand-pink/50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">Liquidity Pool</span>
                          <span className="text-brand-pink">10%</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">DEX Market Making</p>
                        <p className="text-gray-500 text-sm">Release: Permanently locked</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="min-h-screen py-32">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-5xl font-bold text-white mb-16 text-center">Key Metrics</h2>
            <div className="space-y-32">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="transform hover:scale-105 transition-all duration-500"
                >
                  <StatsSection 
                    {...stat}
                    isFirst={index === 0}
                    isLast={index === stats.length - 1}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-32">
          <div className="max-w-6xl mx-auto px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold text-white">Join the Revolution</h2>
              <p className="text-xl text-gray-400">
                Be part of the next generation of social media monetization
              </p>
              <div className="flex justify-center gap-6">
                <button className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-xl blur opacity-60 group-hover:opacity-100 transition"></div>
                  <div className="relative px-8 py-4 bg-black rounded-xl leading-none flex items-center">
                    <span className="text-white text-lg font-medium">Buy TSC Now</span>
                    <span className="ml-2 text-xl group-hover:translate-x-1 transition-transform">›</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 