'use client';

import { useState, useEffect } from 'react';

interface StatsDisplayProps {
  stats: {
    influencers: number;
    brands: number;
    tokenPrice: number;
    tokensSold: number;
  };
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Creators Stats */}
      <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 group hover:border-brand-cyan transition-colors">
        <h3 className="text-gray-400 font-medium mb-4">TikTok 创作者</h3>
        <div className="text-5xl font-bold bg-gradient-to-r from-brand-cyan to-brand-cyan/80 text-transparent bg-clip-text">
          {stats.influencers.toLocaleString()}+
        </div>
        <p className="text-gray-500 mt-2">已加入创作者</p>
      </div>

      {/* Brands Stats */}
      <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 group hover:border-brand-pink transition-colors">
        <h3 className="text-gray-400 font-medium mb-4">品牌商家</h3>
        <div className="text-5xl font-bold bg-gradient-to-r from-brand-pink to-brand-pink/80 text-transparent bg-clip-text">
          {stats.brands.toLocaleString()}+
        </div>
        <p className="text-gray-500 mt-2">合作品牌</p>
      </div>

      {/* Token Stats */}
      <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 group hover:border-white/20 transition-colors">
        <h3 className="text-gray-400 font-medium mb-4">TSC 代币</h3>
        <div className="text-5xl font-bold text-white group-hover:scale-105 transition-transform">
          ${stats.tokenPrice}
        </div>
        <p className="text-gray-500 mt-2">预售价格</p>
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="text-3xl font-bold bg-gradient-to-r from-brand-cyan to-brand-pink text-transparent bg-clip-text">
            {stats.tokensSold.toLocaleString()}
          </div>
          <p className="text-gray-500 mt-1">已售代币数量</p>
        </div>
      </div>
    </div>
  );
}

export function DynamicStats() {
  const [stats, setStats] = useState({
    influencers: 1234,
    brands: 567,
    tokenPrice: 0.015,
    tokensSold: 789123
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        influencers: prev.influencers + Math.floor(Math.random() * 3),
        brands: prev.brands + Math.floor(Math.random() * 2),
        tokenPrice: prev.tokenPrice,
        tokensSold: prev.tokensSold + Math.floor(Math.random() * 100)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return <StatsDisplay stats={stats} />;
} 