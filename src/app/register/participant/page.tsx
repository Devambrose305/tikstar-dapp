'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext'; // Import the context

export default function ParticipantRegistration() {
  const router = useRouter();
  const { setUser } = useUser(); // Get the setUser function from context
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    referralTiktokId: '', // Optional TikTok influencer ID
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Set user data in context
      setUser({
        username: formData.username,
        email: formData.email,
        referralTiktokId: formData.referralTiktokId,
        tscHoldings: "0", // Initialize TSC holdings
      });

      router.push('/participant/dashboard');
    } catch (err) {
      setError('Failed to create account');
    } finally {
      setIsLoading(false);
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

      {/* Registration Form */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-gray-400 rounded-xl blur opacity-75"></div>
            <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-12">
              <div className="space-y-8">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-white mb-2">Join TikStar</h1>
                  <p className="text-gray-400 text-lg">Create your participant account</p>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Username */}
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Enter your username"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Referral TikTok ID */}
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Referral TikTok ID (Optional)
                    </label>
                    <input
                      type="text"
                      name="referralTiktokId"
                      value={formData.referralTiktokId}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Enter TikTok influencer ID who referred you"
                    />
                    <p className="mt-2 text-sm text-gray-400">
                      If you found out about TSC from a TikTok influencer, please enter their ID
                    </p>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Create a password"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Confirm your password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full group mt-8"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-gray-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition"></div>
                    <div className="relative w-full px-8 py-5 bg-black rounded-lg leading-none flex items-center justify-center">
                      <span className="text-xl font-medium text-white">
                        {isLoading ? 'Creating Account...' : 'Complete Registration'}
                      </span>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 