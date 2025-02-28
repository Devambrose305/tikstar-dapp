'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

export default function BrandDashboard() {
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  const [metrics] = useState({
    activeInfluencers: 12,
    totalReach: "2.5M",
    engagementRate: "8.2%",
    campaignROI: "245%"
  });

  const [recentCampaigns] = useState([
    {
      id: 1,
      influencer: "@topinfluencer",
      reach: "1.2M",
      engagement: "95K",
      status: "active"
    },
    {
      id: 2,
      influencer: "@trendmaker",
      reach: "800K",
      engagement: "62K",
      status: "completed"
    }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black font-sans antialiased">
      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="w-full px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
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

            {/* Profile Menu */}
            <div className="flex items-center gap-8">
              <button className="text-gray-400 hover:text-white transition-colors">
                Settings
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="pt-32 px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Brand Profile Section */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-cyan rounded-xl blur opacity-75"></div>
            <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-8">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-brand-cyan/50">
                  {user?.logo ? (
                    <Image
                      src={user.logo}
                      alt={user?.brandName || 'Brand Logo'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-cyan/20 flex items-center justify-center">
                      <span className="text-4xl text-brand-cyan">
                        {user?.brandName ? user.brandName.charAt(0).toUpperCase() : 'B'}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{user?.brandName || 'Brand Name'}</h1>
                  {user?.website && (
                    <a href={user.website} target="_blank" rel="noopener noreferrer" 
                       className="text-brand-cyan hover:text-brand-cyan/80 transition-colors">
                      {user.website}
                    </a>
                  )}
                </div>
                <div className="ml-auto text-right">
                  <div className="text-gray-400">TSC Holdings</div>
                  <div className="text-4xl font-bold text-brand-cyan">{user?.tscHoldings || '0'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-6">
            {/* Active Influencers */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan/50 to-brand-cyan/50 rounded-lg blur opacity-50"></div>
              <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="text-gray-400 mb-2">Active Influencers</div>
                <div className="text-3xl font-bold text-white">{metrics.activeInfluencers}</div>
              </div>
            </div>

            {/* Total Reach */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan/50 to-brand-cyan/50 rounded-lg blur opacity-50"></div>
              <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="text-gray-400 mb-2">Total Reach</div>
                <div className="text-3xl font-bold text-white">{metrics.totalReach}</div>
              </div>
            </div>

            {/* Engagement Rate */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan/50 to-brand-cyan/50 rounded-lg blur opacity-50"></div>
              <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="text-gray-400 mb-2">Engagement Rate</div>
                <div className="text-3xl font-bold text-white">{metrics.engagementRate}</div>
              </div>
            </div>

            {/* Campaign ROI */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan/50 to-brand-cyan/50 rounded-lg blur opacity-50"></div>
              <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="text-gray-400 mb-2">Campaign ROI</div>
                <div className="text-3xl font-bold text-white">{metrics.campaignROI}</div>
              </div>
            </div>
          </div>

          {/* Recent Campaigns */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-cyan rounded-xl blur opacity-75"></div>
            <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Recent Campaigns</h2>
                <button className="text-brand-cyan hover:text-brand-cyan/80 transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentCampaigns.map(campaign => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-xl text-white">{campaign.influencer}</div>
                      <div className="text-gray-400">Reach: {campaign.reach}</div>
                      <div className="text-gray-400">Engagement: {campaign.engagement}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      campaign.status === 'active' 
                        ? 'bg-brand-cyan/20 text-brand-cyan' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {campaign.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 