'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
      // Add your signup logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      router.push('/selection');
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

      {/* Sign Up Form */}
      <div className="pt-40 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-xl blur opacity-75"></div>
            <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-12">
              <div className="space-y-8">
                <div className="text-center space-y-3">
                  <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
                  <p className="text-gray-400 text-lg">Join the TikStar community</p>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="username" className="block text-lg font-medium text-gray-300 mb-3">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                        placeholder="Enter your username"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-lg font-medium text-gray-300 mb-3">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-lg font-medium text-gray-300 mb-3">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                        placeholder="Create a password"
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-300 mb-3">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full group mt-8"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-lg blur opacity-60 group-hover:opacity-100 transition"></div>
                    <div className="relative w-full px-8 py-5 bg-black rounded-lg leading-none flex items-center justify-center">
                      <span className="text-xl font-medium text-white">
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                      </span>
                    </div>
                  </button>
                </form>

                <div className="text-center text-gray-400 text-lg pt-4">
                  Already have an account?{' '}
                  <Link href="/login" className="text-brand-cyan hover:text-brand-cyan/80 transition-colors font-medium">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 