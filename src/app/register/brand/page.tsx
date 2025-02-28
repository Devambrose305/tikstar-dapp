'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { validateImageFile } from '@/utils/fileUpload';
import { useUser } from '@/context/UserContext'; // Import the context

export default function BrandRegistration() {
  const router = useRouter();
  const { setUser } = useUser(); // Get the setUser function from context
  const [formData, setFormData] = useState({
    brandName: '',
    website: '',
    logo: null as File | null,
    collaborationAmount: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Validate file
      validateImageFile(file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
      setFormData({ ...formData, logo: file });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload logo');
      // Reset file input
      e.target.value = '';
    }
  };

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
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('brandName', formData.brandName);
      formDataToSend.append('website', formData.website);
      formDataToSend.append('collaborationAmount', formData.collaborationAmount);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      
      if (formData.logo) {
        formDataToSend.append('logo', formData.logo);
      }

      // Add your API call here
      // Example:
      // const response = await fetch('/api/register/brand', {
      //   method: 'POST',
      //   body: formDataToSend
      // });

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Set user data in context
      setUser({
        brandName: formData.brandName,
        website: formData.website,
        collaborationAmount: formData.collaborationAmount,
        email: formData.email,
        tscHoldings: "0", // Initialize TSC holdings
      });

      router.push('/brand/dashboard');
    } catch (err) {
      setError('Failed to register brand');
    } finally {
      setIsLoading(false);
    }
  };

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-cyan rounded-xl blur opacity-75"></div>
            <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-12">
              <div className="space-y-8">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-white mb-2">Brand Registration</h1>
                  <p className="text-gray-400 text-lg">Complete your brand profile</p>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Logo Upload */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-brand-cyan/50">
                      {previewUrl ? (
                        <Image
                          src={previewUrl}
                          alt="Brand Logo Preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-brand-cyan/10 flex items-center justify-center">
                          <svg className="w-12 h-12 text-brand-cyan/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <label className="relative group cursor-pointer">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <span className="text-brand-cyan group-hover:text-brand-cyan/80 transition-colors">
                        {formData.logo ? 'Change Logo' : 'Upload Brand Logo'}
                      </span>
                    </label>
                    {formData.logo && (
                      <p className="text-sm text-gray-400">
                        {formData.logo.name} ({Math.round(formData.logo.size / 1024)}KB)
                      </p>
                    )}
                  </div>

                  {/* Brand Name */}
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      name="brandName"
                      required
                      value={formData.brandName}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                      placeholder="Enter your brand name"
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Brand Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      required
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                      placeholder="https://yourbrand.com"
                    />
                  </div>

                  {/* Collaboration Amount */}
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-3">
                      Collaboration Amount ($)
                    </label>
                    <input
                      type="number"
                      name="collaborationAmount"
                      required
                      value={formData.collaborationAmount}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                      placeholder="Enter collaboration budget"
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
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                      placeholder="Enter your email"
                    />
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
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
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
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                      placeholder="Confirm your password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full group mt-8"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-cyan rounded-lg blur opacity-60 group-hover:opacity-100 transition"></div>
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