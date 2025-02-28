import { useState, useEffect } from 'react';
import Web3, { ContractAbi } from 'web3';
import { ContractService } from '@/utils/contracts';
import contractABI from '@/config/abi.json';

export function useContract() {
  const [contractService, setContractService] = useState<ContractService | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeContract = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const service = new ContractService(window.ethereum, contractABI as ContractAbi);
          setContractService(service);
        } else {
          setError('Please install MetaMask to use this application');
        }
      } catch (err) {
        setError('Failed to initialize contract service');
        console.error(err);
      }
    };

    initializeContract();
  }, []);

  return { contractService, error };
}

// Example usage in a component:
/*
function ExpertComponent() {
  const { contractService, error } = useContract();
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const loadExperts = async () => {
      if (contractService) {
        const expertList = await contractService.getExpertInfo();
        setExperts(expertList);
      }
    };

    loadExperts();
  }, [contractService]);

  if (error) return <div>Error: {error}</div>;
  if (!contractService) return <div>Loading...</div>;

  return (
    <div>
      {experts.map((expert, index) => (
        <div key={index}>
          <p>TikTok ID: {expert.tikTokId}</p>
          <p>Email: {expert.email}</p>
        </div>
      ))}
    </div>
  );
}
*/ 