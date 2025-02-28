'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useContractContext } from '@/contexts/ContractContext';
import Web3 from 'web3';
import { CONTRACT_ADDRESSES } from '@/config/contracts';
import ConnectWallet from './ConnectWallet';

interface BuyTSCModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuy: (amount: number) => void;
}

function BuyTSCModal({ isOpen, onClose, onBuy }: BuyTSCModalProps) {
  const { contractService, error: contractError } = useContractContext();
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

    setIsProcessing(true);
    setError(null);

    try {
      const web3 = new Web3(window.ethereum!);
      
      // First approve TUSDT spending
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

      const amountWei = web3.utils.toWei(amount, 'ether');
      
      // Approve TUSDT spending
      await tusdtContract.methods.approve(
        CONTRACT_ADDRESSES.TESTNET.LOGIC,
        amountWei
      ).send({ from: walletAddress });

      // Buy TSC
      await contractService.buyTSC(amountWei);
      
      onBuy(Number(amount));
      onClose();
    } catch (error) {
      console.error('Purchase failed:', error);
      setError(error instanceof Error ? error.message : 'Purchase failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-black/90 rounded-xl border border-white/10 p-8 max-w-md w-full">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-xl blur opacity-30"></div>
        <div className="relative">
          <h2 className="text-2xl font-bold text-white mb-6">Buy TSC Tokens</h2>
          
          <div className="space-y-6">
            {!walletAddress ? (
              <ConnectWallet onConnect={handleWalletConnect} />
            ) : (
              <>
                <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                  <span className="block text-sm text-gray-400">Connected Wallet</span>
                  <span className="block text-white font-mono">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>

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
                  <span className="block mt-2 text-sm text-gray-400">
                    You will receive: {amount ? Number(amount) / 0.05 : 0} TSC
                  </span>
                </div>

                <button
                  onClick={handleBuy}
                  disabled={isProcessing || !amount}
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

                {contractError && (
                  <div className="p-4 rounded-lg border border-red-500/50 bg-red-500/10">
                    <span className="text-sm text-red-400">{contractError}</span>
                  </div>
                )}
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Export as client-side only component
export default dynamic(() => Promise.resolve(BuyTSCModal), {
  ssr: false
}); 