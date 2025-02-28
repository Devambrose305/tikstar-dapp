'use client';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Image from 'next/image';
import { CONTRACT_ADDRESSES } from '@/config/contracts';
import dynamic from 'next/dynamic';

interface ConnectWalletProps {
  onConnect: (address: string) => void;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

const ConnectWallet = ({ onConnect }: ConnectWalletProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [balance, setBalance] = useState<string>('0');
  const [network, setNetwork] = useState<string>('');
  const [tscBalance, setTscBalance] = useState<string>('0');

  const clearErrorTimeout = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 2000);
  };

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined' && window.ethereum) {
      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            handleConnection(accounts[0]);
          }
        })
        .catch((err: any) => {
          console.error('Error checking accounts:', err);
        });

      // Add event listeners
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      handleConnection(accounts[0]);
    } else {
      setConnectedAddress('');
      setBalance('0');
      setNetwork('');
    }
  };

  const handleChainChanged = (chainId: string) => {
    updateNetworkInfo(chainId);
  };

  const updateNetworkInfo = async (chainId: string) => {
    const networkName = parseInt(chainId, 16) === 97 ? 'BSC Testnet' : 'Unknown Network';
    setNetwork(networkName);
  };

  const updateBalance = async (address: string) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const balance = await web3.eth.getBalance(address);
        const balanceInBNB = web3.utils.fromWei(balance, 'ether');
        setBalance(parseFloat(balanceInBNB).toFixed(4));
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance('0');
      }
    }
  };

  const checkTSCBalance = async (address: string) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const contract = new web3.eth.Contract([{
          "constant": true,
          "inputs": [{"name": "_owner", "type": "address"}],
          "name": "balanceOf",
          "outputs": [{"name": "balance", "type": "uint256"}],
          "type": "function"
        }] as any, CONTRACT_ADDRESSES.TESTNET.TTSC);
        
        const balance = await contract.methods.balanceOf(address).call();
        if (balance) {
          const balanceInTSC = web3.utils.fromWei(balance.toString(), 'ether');
          setTscBalance(parseFloat(balanceInTSC).toFixed(4));
        }
      } catch (error) {
        console.error('Error fetching TSC balance:', error);
        setTscBalance('0');
      }
    }
  };

  const handleConnection = async (address: string) => {
    setConnectedAddress(address);
    onConnect(address);
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    updateNetworkInfo(chainId);
    updateBalance(address);
    checkTSCBalance(address);
  };

  const connectWallet = async () => {
    console.log('Connect wallet clicked');
    setIsConnecting(true);
    setError('');

    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to connect your wallet');
      }

      console.log('Requesting accounts...');
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      console.log('Accounts received:', accounts);
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please check MetaMask');
      }

      const address = accounts[0];
      console.log('Selected address:', address);

      const chainId = await window.ethereum.request({ 
        method: 'eth_chainId' 
      });
      
      console.log('Current chainId:', chainId);
      
      if (parseInt(chainId, 16) !== 97) {
        console.log('Wrong network, switching to BSC Testnet...');
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x61' }],
          });
          console.log('Successfully switched to BSC Testnet');
        } catch (switchError: any) {
          console.log('Switch error:', switchError);
          if (switchError.code === 4902) {
            console.log('Network not found, adding BSC Testnet...');
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x61',
                chainName: 'BSC Testnet',
                nativeCurrency: {
                  name: 'tBNB',
                  symbol: 'tBNB',
                  decimals: 18
                },
                rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
                blockExplorerUrls: ['https://testnet.bscscan.com']
              }],
            });
            console.log('Successfully added BSC Testnet');
          } else {
            throw switchError;
          }
        }
      }

      console.log('Calling onConnect with address:', address);
      await handleConnection(address);
    } catch (err) {
      console.error('Detailed wallet connection error:', err);
      if (err instanceof Error) {
        if (err.message.includes('User rejected')) {
          setError('Connection rejected. Please approve the connection in MetaMask');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to connect wallet');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setConnectedAddress('');
    setBalance('0');
    setNetwork('');
    setShowDropdown(false);
  };

  if (!mounted) return null;

  return (
    <>
      <div className="relative group ml-2">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-lg blur opacity-50 group-hover:opacity-100 transition"></div>
        {!connectedAddress ? (
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="relative px-5 py-2.5 bg-black rounded-lg leading-none flex items-center disabled:opacity-50"
          >
            <span className="text-white text-lg font-medium">
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </span>
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="relative px-5 py-2.5 bg-black rounded-lg leading-none flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-white text-lg font-medium">
                {`${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}`}
              </span>
            </button>

            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-black/95 border border-white/10 rounded-xl shadow-xl backdrop-blur-md p-4 z-[90]">
                {/* Wallet Info Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Connected Wallet</div>
                        <div className="text-white font-medium">
                          {`${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}`}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        window.open(`https://testnet.bscscan.com/address/${connectedAddress}`, '_blank');
                      }}
                      className="text-brand-cyan hover:text-brand-cyan/80 transition-colors text-sm"
                    >
                      View on BSCScan ↗
                    </button>
                  </div>

                  {/* Balance Section */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <div className="text-sm text-gray-400">Balance</div>
                      <div className="text-xl font-bold text-white flex items-center gap-2">
                        {balance} <span className="text-brand-cyan">tBNB</span>
                      </div>
                      <div className="text-lg text-white flex items-center gap-2 mt-2">
                        {tscBalance} <span className="text-brand-pink">TSC</span>
                      </div>
                    </div>
                    <a 
                      href="https://testnet.binance.org/faucet-smart"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-brand-cyan/10 text-brand-cyan text-sm rounded-lg hover:bg-brand-cyan/20 transition-colors"
                    >
                      Get Test BNB
                    </a>
                  </div>

                  {/* Network Section */}
                  <div className="flex items-center justify-between pb-4">
                    <div>
                      <div className="text-sm text-gray-400">Network</div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-white font-medium">{network}</span>
                      </div>
                    </div>
                    <button 
                      onClick={async () => {
                        try {
                          setError('');
                          const chainId = await window.ethereum.request({ 
                            method: 'eth_chainId' 
                          });
                          
                          if (parseInt(chainId, 16) === 97) {
                            clearErrorTimeout('Already connected to BSC Testnet');
                            return;
                          }

                          await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: '0x61' }], // BSC Testnet
                          }).catch(async (switchError: any) => {
                            // This error code indicates that the chain has not been added to MetaMask
                            if (switchError.code === 4902) {
                              await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [{
                                  chainId: '0x61',
                                  chainName: 'BSC Testnet',
                                  nativeCurrency: {
                                    name: 'tBNB',
                                    symbol: 'tBNB',
                                    decimals: 18
                                  },
                                  rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
                                  blockExplorerUrls: ['https://testnet.bscscan.com']
                                }],
                              });
                            } else {
                              throw switchError;
                            }
                          });

                          // Update network info after successful switch
                          const newChainId = await window.ethereum.request({ 
                            method: 'eth_chainId' 
                          });
                          await updateNetworkInfo(newChainId);
                          
                          // Update balance after network switch
                          if (connectedAddress) {
                            await updateBalance(connectedAddress);
                          }

                          clearErrorTimeout('Successfully switched to BSC Testnet');
                        } catch (error: any) {
                          console.error('Network switch failed:', error);
                          if (error.code === 4001) {
                            setError('Network switch was rejected. Please try again.');
                          } else if (error.code === -32002) {
                            setError('Please check MetaMask for pending request.');
                          } else {
                            setError(error.message || 'Failed to switch network');
                          }
                          // Clear error messages after 2 seconds for user rejections
                          if (error.code === 4001) {
                            setTimeout(() => {
                              setError('');
                            }, 2000);
                          }
                        }
                      }}
                      className="px-3 py-1.5 bg-brand-cyan/10 text-brand-cyan text-sm rounded-lg hover:bg-brand-cyan/20 transition-colors"
                    >
                      Switch Network
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(connectedAddress);
                          clearErrorTimeout('Address copied to clipboard');
                        } catch (err) {
                          setError('Failed to copy address');
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors rounded-lg text-white text-sm font-medium"
                    >
                      Copy Address
                    </button>
                    <button
                      onClick={disconnectWallet}
                      className="flex-1 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors rounded-lg text-sm font-medium"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {error && (
          <div className="fixed top-24 right-4 w-64 p-2 bg-red-500/10 border border-red-500/50 rounded text-sm text-red-400 z-[100] shadow-lg backdrop-blur-sm">
            {error}
          </div>
        )}
      </div>
    </>
  );
};

// Export as client-side only component
export default dynamic(() => Promise.resolve(ConnectWallet), {
  ssr: false
}); 