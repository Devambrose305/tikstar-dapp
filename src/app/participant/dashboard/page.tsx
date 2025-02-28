'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BuyTSCModal from '@/components/BuyTSCModal';

export default function ParticipantDashboard() {
  // Mock data - replace with real data from your backend
  const [userData] = useState({
    username: "cryptouser123",
    email: "user@example.com",
    tscHoldings: "5000",
    referralInfluencer: "@topinfluencer",
    walletAddress: "0x1234...5678"
  });

  const [transactions] = useState([
    {
      id: 1,
      type: "purchase",
      amount: "1000 TSC",
      price: "50 USDT",
      date: "2024-02-20",
      status: "completed"
    },
    {
      id: 2,
      type: "referral_bonus",
      amount: "100 TSC",
      from: "@topinfluencer",
      date: "2024-02-18",
      status: "completed"
    }
  ]);

  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  const handleBuyTSC = () => {
    setIsBuyModalOpen(true);
  };

  const handleBuyConfirm = async (amount: number) => {
    // Implement wallet connection and purchase logic
    console.log(`Buying ${amount} worth of TSC`);
  };

  return (
    <>
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
            {/* Profile Section */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-gray-400 rounded-xl blur opacity-75"></div>
              <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <div className="flex items-center gap-8">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/50">
                    <div className="w-full h-full bg-white/20 flex items-center justify-center">
                      <span className="text-4xl text-white">
                        {userData.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{userData.username}</h1>
                    <div className="text-gray-400">Wallet: {userData.walletAddress}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-gray-400">TSC Holdings</div>
                    <div className="text-4xl font-bold text-white">{userData.tscHoldings}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-6">
              {/* Buy TSC */}
              <button 
                onClick={handleBuyTSC}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-lg blur opacity-50 group-hover:opacity-100 transition"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Buy TSC</h3>
                    <p className="text-gray-400">Current price: 0.05 USDT</p>
                  </div>
                  <svg className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>

              {/* Referral Info */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-gray-400 rounded-lg blur opacity-50"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Referral Influencer</h3>
                  <p className="text-gray-400">{userData.referralInfluencer || 'Not connected'}</p>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-gray-400 rounded-xl blur opacity-75"></div>
              <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Transaction History</h2>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {transactions.map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-xl text-white capitalize">{transaction.type.replace('_', ' ')}</div>
                        <div className="text-brand-cyan">{transaction.amount}</div>
                        {transaction.price && <div className="text-gray-400">({transaction.price})</div>}
                        {transaction.from && <div className="text-gray-400">From: {transaction.from}</div>}
                        <div className="text-gray-400">{transaction.date}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        transaction.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {transaction.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BuyTSCModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        onBuy={handleBuyConfirm}
      />
    </>
  );
} 