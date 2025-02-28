'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/context/UserContext'; // Import the context
import { useContractContext } from '@/contexts/ContractContext';

export default function InfluencerDashboard() {
  const { user } = useUser(); // Get user data from context
  const { contractService } = useContractContext();
  const [mounted, setMounted] = useState(false);
  const [isExpert, setIsExpert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tiktokId, setTiktokId] = useState('');
  const [email, setEmail] = useState('');

  const [metrics] = useState({
    engagementRate: "8.5%",
    averageLikes: "250K",
    averageComments: "15K",
    activeCampaigns: 5
  });

  const [followerStats] = useState({
    totalFollowerPurchases: 1284,
    totalCommissionEarned: "25,670",
    recentPurchases: [
    {
      id: 1,
        follower: "crypto_fan_92",
        amount: "1000 TSC",
        commission: "50 TSC",
        date: "2024-02-25"
    },
    {
      id: 2,
        follower: "blockchain_lover",
        amount: "500 TSC",
        commission: "25 TSC",
        date: "2024-02-24"
      },
      {
        id: 3,
        follower: "web3_enthusiast",
        amount: "2000 TSC",
        commission: "100 TSC",
        date: "2024-02-23"
      }
    ]
  });

  useEffect(() => {
    setMounted(true);
    checkExpertStatus();
  }, []);

  const checkExpertStatus = async () => {
    if (contractService && window.ethereum) {
      try {
        const experts = await contractService.getExpertInfo();
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          const isRegistered = experts.some(expert => 
            expert._add.toLowerCase() === accounts[0].toLowerCase()
          );
          setIsExpert(isRegistered);
        }
      } catch (error) {
        console.error('Error checking expert status:', error);
      }
    }
  };

  const handleJoinExpert = async () => {
    if (!contractService) {
      setError('Contract service not initialized');
      return;
    }

    if (!tiktokId || !email) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await contractService.joinExpert(tiktokId, email);
      if (result) {
        setSuccess('Successfully registered as an expert!');
        setIsExpert(true);
        // Clear form
        setTiktokId('');
        setEmail('');
      } else {
        throw new Error('Failed to register as expert');
      }
    } catch (error) {
      console.error('Error joining as expert:', error);
      setError(error instanceof Error ? error.message : 'Failed to register as expert');
    } finally {
      setLoading(false);
    }
  };

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
                  width={80}
                  height={80}
                  priority
                  className="relative transform hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                TikStar
              </span>
                <span className="text-3xl font-bold bg-gradient-to-r from-brand-cyan to-brand-pink bg-clip-text text-transparent">
                  Coin
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center justify-between flex-1 ml-12">
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
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="pt-32 px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Profile Section */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-pink to-brand-pink rounded-xl blur opacity-75"></div>
            <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-8">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-brand-pink/50">
                  <div className="w-full h-full bg-brand-pink/20 flex items-center justify-center">
                    <span className="text-4xl text-brand-pink">
                      {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{user?.username || 'User'}</h1>
                  <div className="text-brand-pink">TikTok ID: {user?.tiktokId || 'Not Connected'}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-gray-400">TSC Holdings</div>
                  <div className="text-4xl font-bold text-brand-pink">{user?.tscHoldings || '0'}</div>
                  <div className="text-sm text-gray-400 mt-1">
                    Commission Earned: {user?.tscCommission || '0'} TSC
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Join as Expert Section - Only show if not already an expert */}
          {!isExpert && (
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-xl blur opacity-75"></div>
              <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Join as Expert</h2>
                    <p className="text-gray-400">Register as a TikTok influencer to start earning commissions</p>
                  </div>

                  {error && (
                    <div className="p-4 rounded-lg border border-red-500/50 bg-red-500/10">
                      <span className="text-sm text-red-400">{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="p-4 rounded-lg border border-green-500/50 bg-green-500/10">
                      <span className="text-sm text-green-400">{success}</span>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-medium text-gray-300 mb-3">
                        TikTok ID
                      </label>
                      <input
                        type="text"
                        value={tiktokId}
                        onChange={(e) => setTiktokId(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                        placeholder="Enter your TikTok ID"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-medium text-gray-300 mb-3">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                        placeholder="Enter your email"
                      />
                    </div>

                    <button
                      onClick={handleJoinExpert}
                      disabled={loading || !tiktokId || !email}
                      className="relative w-full group disabled:opacity-50"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-lg blur opacity-60 group-hover:opacity-100 transition"></div>
                      <div className="relative w-full px-8 py-4 bg-black rounded-lg leading-none flex items-center justify-center">
                        <span className="text-xl font-medium text-white">
                          {loading ? 'Registering...' : 'Join as Expert'}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Follower Purchases Section */}
            <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-xl blur opacity-75"></div>
            <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Follower Purchases</h2>
                  <p className="text-gray-400">Track your follower purchases and earned commissions</p>
            </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-brand-cyan/30 transition-colors">
                    <div className="text-gray-400 mb-2">Total Purchases</div>
                    <div className="text-3xl font-bold text-brand-cyan">{followerStats.totalFollowerPurchases}</div>
                  </div>
                  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-brand-pink/30 transition-colors">
                    <div className="text-gray-400 mb-2">Total Commission</div>
                    <div className="text-3xl font-bold text-brand-pink">{followerStats.totalCommissionEarned} TSC</div>
              </div>
            </div>

                {/* Commission Info Box */}
                <div className="bg-brand-cyan/10 border border-brand-cyan/20 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-cyan/20 rounded-lg">
                      <svg className="w-6 h-6 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">How Commissions Work</h3>
                      <p className="text-gray-300">
                        Earn 5% commission in TSC tokens when your followers purchase TikStarCoin through your referral. 
                        Commissions are automatically credited to your wallet upon successful purchase.
                      </p>
                    </div>
              </div>
            </div>
              </div>
            </div>
          </div>

          {/* Brand Collaboration Info */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-xl blur opacity-75"></div>
            <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Brand Collaborations</h2>
                  <p className="text-gray-400">View and manage your brand partnerships</p>
                </div>

                {/* Collaboration Info Box */}
                <div className="bg-brand-cyan/10 border border-brand-cyan/20 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-cyan/20 rounded-lg">
                      <svg className="w-6 h-6 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Collaboration Benefits</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></div>
                          <p className="text-gray-300">Access to exclusive brand partnerships</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></div>
                          <p className="text-gray-300">Earn TSC tokens for successful promotions</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></div>
                          <p className="text-gray-300">Participate in brand campaigns</p>
                        </div>
              </div>
                    </div>
                  </div>
                </div>

                {/* Active Campaigns */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Active Brand Campaigns</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-6 border border-white/10 rounded-lg hover:border-brand-cyan/30 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Fashion Brand Campaign</h4>
                          <p className="text-gray-400 mb-4">Promote our latest summer collection</p>
                          <div className="flex items-center gap-4">
                            <span className="px-3 py-1 bg-brand-cyan/10 text-brand-cyan rounded-full text-sm">
                              Active
                            </span>
                            <span className="text-gray-400">
                              Duration: 30 days
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-brand-pink text-lg font-semibold">500 TSC</div>
                          <div className="text-gray-400 text-sm">Reward</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 