'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function PartnersPage() {
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
                    <span className="text-8xl font-bold bg-gradient-to-r from-brand-pink to-white bg-clip-text text-transparent animate-count">
                      66
                    </span>
                    <span className="text-brand-pink text-3xl">Brand Partners</span>
                  </div>
                  <div className="space-y-6">
                    <p className="text-xl text-gray-300">
                      Leading brands leveraging the TikStar ecosystem for enhanced influencer marketing.
                    </p>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                        <div className="text-2xl font-bold text-brand-pink">$2.8M</div>
                        <div className="text-gray-400 text-sm">Total Investment</div>
                      </div>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                        <div className="text-2xl font-bold text-brand-pink">32%</div>
                        <div className="text-gray-400 text-sm">ROI Increase</div>
                      </div>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                        <div className="text-2xl font-bold text-brand-pink">150+</div>
                        <div className="text-gray-400 text-sm">Active Campaigns</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">Industry Distribution</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span className="text-gray-400">Fashion & Apparel</span>
                      <span className="text-brand-pink">40%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-400">Beauty & Cosmetics</span>
                      <span className="text-brand-pink">25%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-400">Tech & Electronics</span>
                      <span className="text-brand-pink">20%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-400">Others</span>
                      <span className="text-brand-pink">15%</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">Partnership Growth</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Current</span>
                      <span className="text-brand-pink">66</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Q2 2024</span>
                      <span className="text-brand-pink">500+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Q4 2024</span>
                      <span className="text-brand-pink">5,000+</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign Performance */}
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Campaign Performance Metrics</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-brand-pink">25M+</div>
                    <div className="text-gray-400 text-sm">Total Reach</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-brand-pink">4.2%</div>
                    <div className="text-gray-400 text-sm">Engagement Rate</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-brand-pink">$1.2M</div>
                    <div className="text-gray-400 text-sm">Revenue Generated</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-brand-pink">18%</div>
                    <div className="text-gray-400 text-sm">Conversion Rate</div>
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