'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function SalesPage() {
  return (
    <main className="min-h-screen bg-black font-sans antialiased">
      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="container mx-auto px-8 py-4">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-full blur-md opacity-40 group-hover:opacity-75 transition-opacity"></div>
              <Image
                src="/images/logo.png"
                alt="TikStar Logo"
                width={48}
                height={48}
                priority
                className="relative transform hover:scale-105 transition-all duration-300"
              />
            </div>
            <span className="text-xl font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              TikStar
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <section className="relative pt-48 pb-20">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            {/* Stats Display */}
            <div className="space-y-12">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-2xl blur opacity-25"></div>
                <div className="relative bg-black/50 border border-white/10 rounded-2xl p-12">
                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="text-8xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent animate-count">
                      570,838
                    </span>
                    <span className="text-white text-3xl">TSC Sold</span>
                  </div>
                  <div className="space-y-6">
                    <p className="text-xl text-gray-300">
                      Current presale progress and token distribution metrics
                    </p>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                        <div className="text-2xl font-bold text-white">57.08%</div>
                        <div className="text-gray-400 text-sm">Presale Progress</div>
                      </div>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                        <div className="text-2xl font-bold text-white">0.05 USDT</div>
                        <div className="text-gray-400 text-sm">Token Price</div>
                      </div>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                        <div className="text-2xl font-bold text-white">17</div>
                        <div className="text-gray-400 text-sm">Days Remaining</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Token Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">Token Distribution</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span className="text-gray-400">Presale</span>
                      <span className="text-white">30%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-400">Ecosystem Fund</span>
                      <span className="text-white">20%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-400">Airdrop Pools</span>
                      <span className="text-white">30%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-400">Community & Liquidity</span>
                      <span className="text-white">20%</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">Presale Timeline</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Start Date</span>
                      <span className="text-white">Feb 26, 2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">End Date</span>
                      <span className="text-white">Mar 15, 2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Token Release</span>
                      <span className="text-white">Mar 20, 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Stats */}
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Purchase Statistics</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-white">1,247</div>
                    <div className="text-gray-400 text-sm">Total Buyers</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-white">28,541</div>
                    <div className="text-gray-400 text-sm">Avg. Token/Buyer</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-white">$1.42M</div>
                    <div className="text-gray-400 text-sm">Total Value</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-white">429,162</div>
                    <div className="text-gray-400 text-sm">Remaining Tokens</div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-2xl blur opacity-25"></div>
                <div className="relative bg-black/50 border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Join the Presale Now</h3>
                      <p className="text-gray-400">Don't miss out on the early investor benefits</p>
                    </div>
                    <Link 
                      href="/buy" 
                      className="relative group inline-block"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-xl blur opacity-60 group-hover:opacity-100 transition"></div>
                      <div className="relative px-8 py-4 bg-black rounded-xl leading-none flex items-center">
                        <span className="text-white text-lg font-medium">Buy TSC</span>
                        <span className="ml-2 text-xl group-hover:translate-x-1 transition-transform">›</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 