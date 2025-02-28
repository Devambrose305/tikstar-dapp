'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    try {
      // Add your login logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      router.push('/selection');
    } catch (err) {
      setError('Invalid email or password');
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

      {/* Login Form */}
      <div className="pt-40 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-pink to-brand-cyan rounded-xl blur opacity-75"></div>
            <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-12">
              <div className="space-y-8">
                <div className="text-center space-y-3">
                  <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
                  <p className="text-gray-400 text-lg">Log in to your TikStar account</p>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
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
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-pink/50"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label htmlFor="password" className="block text-lg font-medium text-gray-300">
                          Password
                        </label>
                        <Link 
                          href="/forgot-password" 
                          className="text-brand-pink hover:text-brand-pink/80 transition-colors text-sm"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-pink/50"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full group mt-8"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-pink to-brand-cyan rounded-lg blur opacity-60 group-hover:opacity-100 transition"></div>
                    <div className="relative w-full px-8 py-5 bg-black rounded-lg leading-none flex items-center justify-center">
                      <span className="text-xl font-medium text-white">
                        {isLoading ? 'Logging in...' : 'Log In'}
                      </span>
                    </div>
                  </button>
                </form>

                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-black text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-3 px-6 py-4 bg-black/50 border border-white/10 rounded-lg hover:border-white/20 transition-colors">
                      <Image src="/images/google.svg" alt="Google" width={20} height={20} />
                      <span className="text-white">Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-3 px-6 py-4 bg-black/50 border border-white/10 rounded-lg hover:border-white/20 transition-colors">
                      <Image src="/images/metamask.svg" alt="MetaMask" width={20} height={20} />
                      <span className="text-white">MetaMask</span>
                    </button>
                  </div>
                </div>

                <div className="text-center text-gray-400 text-lg pt-4">
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-brand-pink hover:text-brand-pink/80 transition-colors font-medium">
                    Sign up
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