'use client';
import { useState, useEffect } from 'react';
import { useContractContext } from '@/contexts/ContractContext';
import Web3 from 'web3';
import { CONTRACT_ADDRESSES } from '@/config/contracts';
import ConnectWallet from '@/components/ConnectWallet';
import Link from 'next/link';

export default function BuyPage() {
  const { contractService, error: contractError } = useContractContext();
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    setError(null);
  };

  const handleBuy = async () => {
    if (!walletAddress) {
      setError('Please connect your wallet first');
      return;
    }

    if (!contractService) {
      setError('Contract service not initialized');
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      const web3 = new Web3(window.ethereum!);
      
      // Convert purchase amount to wei
      const purchaseAmountWei = web3.utils.toWei(amount, 'ether');
      
      console.log('Creating TUSDT contract instance...');
      const tusdtContract = new web3.eth.Contract([{
        "constant": false,
        "inputs": [
          {"name": "_spender", "type": "address"},
          {"name": "_value", "type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"name": "", "type": "bool"}],
        "type": "function"
      }] as any, CONTRACT_ADDRESSES.TESTNET.TUSDT);
      
      console.log('Approving TUSDT spend...');
      const approveTx = await tusdtContract.methods.approve(
        CONTRACT_ADDRESSES.TESTNET.LOGIC,
        purchaseAmountWei
      ).send({ from: walletAddress });
      
      console.log('TUSDT approved:', approveTx);
      setSuccess('TUSDT spending approved');

      console.log('Buying TSC...');
      const buyTx = await contractService.buyTSC(purchaseAmountWei);
      console.log('Buy transaction:', buyTx);
      setSuccess('Successfully purchased TSC!');
      
      // Clear amount after successful purchase
      setAmount('');
    } catch (error) {
      console.error('Purchase failed:', error);
      setError(error instanceof Error ? error.message : 'Purchase failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white py-32">
      <div className="max-w-4xl mx-auto px-8">
        <div className="mb-12">
          <Link 
            href="/"
            className="text-brand-cyan hover:text-brand-cyan/80 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-xl blur opacity-75"></div>
          <div className="relative bg-black/90 backdrop-blur-sm border border-white/10 rounded-xl p-12">
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-white">Buy TikStar Coin</h1>
                <p className="text-xl text-gray-400">
                  Current Price: <span className="text-brand-cyan">0.05 USDT</span> per TSC
                </p>
              </div>

              <div className="space-y-8">
                {!walletAddress ? (
                  <div className="flex justify-center">
                    <ConnectWallet onConnect={handleWalletConnect} />
                  </div>
                ) : (
                  <>
                    <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                      <span className="block text-sm text-gray-400">Connected Wallet</span>
                      <span className="block text-white font-mono">
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                      </span>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-lg font-medium text-gray-300 mb-3">
                          Amount (USDT)
                        </label>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                          placeholder="Enter amount"
                        />
                        <div className="mt-2 flex justify-between text-sm">
                          <span className="text-gray-400">
                            You will receive: {amount ? Number(amount) / 0.05 : 0} TSC
                          </span>
                          <button 
                            onClick={() => setAmount('100')}
                            className="text-brand-cyan hover:text-brand-cyan/80 transition-colors"
                          >
                            Buy with 100 USDT
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={handleBuy}
                        disabled={isProcessing || !amount || Number(amount) <= 0}
                        className="relative w-full group disabled:opacity-50"
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-lg blur opacity-60 group-hover:opacity-100 transition"></div>
                        <div className="relative w-full px-8 py-4 bg-black rounded-lg leading-none flex items-center justify-center">
                          <span className="text-xl font-medium text-white">
                            {isProcessing ? 'Processing...' : 'Buy TSC'}
                          </span>
                        </div>
                      </button>

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

                      {contractError && (
                        <div className="p-4 rounded-lg border border-red-500/50 bg-red-500/10">
                          <span className="text-sm text-red-400">{contractError}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 