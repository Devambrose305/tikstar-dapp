'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Web3, { ContractAbi } from 'web3';
import { ContractService } from '@/utils/contracts';
import contractABI from '@/config/abi.json';
import { CONTRACT_ADDRESSES } from '@/config/contracts';

interface ContractContextType {
  contractService: ContractService | null;
  error: string | null;
}

const ContractContext = createContext<ContractContextType>({
  contractService: null,
  error: null,
});

export function ContractProvider({ children }: { children: ReactNode }) {
  const [contractService, setContractService] = useState<ContractService | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeContract = async () => {
      try {
        if (typeof window.ethereum === 'undefined') {
          throw new Error('Please install MetaMask to use this application');
        }

        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        if (!accounts || accounts.length === 0) {
          throw new Error('Please connect your MetaMask wallet');
        }

        // Check network
        const chainId = await window.ethereum.request({ 
          method: 'eth_chainId' 
        });
        
        if (parseInt(chainId, 16) !== 97) {
          throw new Error('Please switch to BSC Testnet (Chain ID: 97)');
        }

        // Initialize Web3 and contract service
        const web3 = new Web3(window.ethereum);
        const service = new ContractService(window.ethereum, contractABI as ContractAbi);
        
        // Verify contract addresses
        const code = await web3.eth.getCode(CONTRACT_ADDRESSES.TESTNET.LOGIC);
        if (code === '0x' || code === '0x0') {
          throw new Error('Contract not deployed at specified address');
        }

        setContractService(service);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to initialize contract service';
        setError(message);
        console.error('Contract initialization error:', err);
      }
    };

    initializeContract();

    // Listen for network changes
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });

      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
    }

    // Cleanup listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', () => {});
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  return (
    <ContractContext.Provider value={{ contractService, error }}>
      {children}
    </ContractContext.Provider>
  );
}

export function useContractContext() {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContractContext must be used within a ContractProvider');
  }
  return context;
}

// Example usage in _app.tsx:
/*
import { ContractProvider } from '@/contexts/ContractContext';

function MyApp({ Component, pageProps }) {
  return (
    <ContractProvider>
      <Component {...pageProps} />
    </ContractProvider>
  );
}

export default MyApp;
*/ 