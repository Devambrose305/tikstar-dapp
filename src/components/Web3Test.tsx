'use client';
import { useState, useEffect } from 'react';
import { useContractContext } from '@/contexts/ContractContext';
import { CONTRACT_ADDRESSES } from '@/config/contracts';
import Web3 from 'web3';

// Minimal ERC20 ABI for balance checking
const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "_spender", "type": "address"},
      {"name": "_value", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const BSC_TESTNET = {
  chainId: '0x61', // 97 in hexadecimal
  chainName: 'BSC Testnet',
  nativeCurrency: {
    name: 'tBNB',
    symbol: 'tBNB',
    decimals: 18
  },
  rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
  blockExplorerUrls: ['https://testnet.bscscan.com']
};

export default function Web3Test() {
  const { contractService, error: contractError } = useContractContext();
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [expertCount, setExpertCount] = useState<number>(0);
  const [testResults, setTestResults] = useState<Array<{test: string; status: 'success' | 'error'; message: string}>>([]);
  const [mounted, setMounted] = useState(false);
  const [usdtBalance, setUsdtBalance] = useState<string>('0');
  const [tscBalance, setTscBalance] = useState<string>('0');
  const [testTikTokId, setTestTikTokId] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [brandCount, setBrandCount] = useState<number>(0);
  const [invitationCount, setInvitationCount] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        });
    }
  }, []);

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return null;
  }

  const addTestResult = (test: string, status: 'success' | 'error', message: string) => {
    setTestResults(prev => [...prev, { test, status, message }]);
  };

  const verifyContract = async (address: string) => {
    try {
      const code = await window.ethereum!.request({
        method: 'eth_getCode',
        params: [address, 'latest']
      });
      return code !== '0x';
    } catch (error) {
      return false;
    }
  };

  const checkTokenBalance = async (tokenAddress: string, decimals: number = 18) => {
    if (!window.ethereum || !walletAddress) return '0';

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(ERC20_ABI as any, tokenAddress);
    
    try {
      const balance = await contract.methods.balanceOf(walletAddress).call();
      return (Number(balance) / Math.pow(10, decimals)).toString();
    } catch (error) {
      console.error('Error checking balance:', error);
      return '0';
    }
  };

  const checkBalances = async () => {
    // Check TUSDT Balance
    try {
      const tusdt = await checkTokenBalance(CONTRACT_ADDRESSES.TESTNET.TUSDT, 18);
      setUsdtBalance(tusdt);
      addTestResult('TUSDT Balance', 'success', `${tusdt} TUSDT`);
    } catch (error) {
      addTestResult('TUSDT Balance', 'error', `Failed to get TUSDT balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Check TSC Balance
    try {
      const tsc = await checkTokenBalance(CONTRACT_ADDRESSES.TESTNET.TTSC, 18);
      setTscBalance(tsc);
      addTestResult('TSC Balance', 'success', `${tsc} TSC`);
    } catch (error) {
      addTestResult('TSC Balance', 'error', `Failed to get TSC balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const switchToBSCTestnet = async () => {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    try {
      // Try to switch to BSC Testnet
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BSC_TESTNET.chainId }],
      });
      addTestResult('Network Switch', 'success', 'Successfully switched to BSC Testnet');
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [BSC_TESTNET],
          });
          addTestResult('Network Switch', 'success', 'Successfully added and switched to BSC Testnet');
        } catch (addError) {
          throw new Error('Failed to add BSC Testnet network');
        }
      } else {
        throw switchError;
      }
    }
  };

  const runTests = async () => {
    setTestResults([]);

    // Test 1: Check MetaMask Connection
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not installed');
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      addTestResult('MetaMask Connection', 'success', `Connected to wallet: ${accounts[0]}`);
    } catch (error) {
      addTestResult('MetaMask Connection', 'error', `Failed to connect: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return;
    }

    // Test 2: Check and Switch Network
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const networkId = parseInt(chainId, 16);
      
      if (networkId !== 97) {
        addTestResult('Network Check', 'error', 'Not connected to BSC Testnet. Attempting to switch...');
        await switchToBSCTestnet();
      } else {
        addTestResult('Network Check', 'success', 'Already connected to BSC Testnet');
      }
    } catch (error) {
      addTestResult('Network Check', 'error', `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return;
    }

    // Test 3: Verify TUSDT Contract
    try {
      const tusdtExists = await verifyContract(CONTRACT_ADDRESSES.TESTNET.TUSDT);
      if (!tusdtExists) {
        throw new Error('TUSDT contract not found at specified address');
      }
      addTestResult('TUSDT Contract', 'success', `Verified at ${CONTRACT_ADDRESSES.TESTNET.TUSDT}`);
      
      // Check TUSDT balance after verifying contract
      await checkBalances();
    } catch (error) {
      addTestResult('TUSDT Contract', 'error', `Failed to verify: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return;
    }

    // Test 4: Verify TSC Contract
    try {
      const tscExists = await verifyContract(CONTRACT_ADDRESSES.TESTNET.TTSC);
      if (!tscExists) {
        throw new Error('TSC contract not found at specified address');
      }
      addTestResult('TSC Contract', 'success', `Verified at ${CONTRACT_ADDRESSES.TESTNET.TTSC}`);
    } catch (error) {
      addTestResult('TSC Contract', 'error', `Failed to verify: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return;
    }

    // Test 5: Verify Logic Contract
    try {
      const logicExists = await verifyContract(CONTRACT_ADDRESSES.TESTNET.LOGIC);
      if (!logicExists) {
        throw new Error('Logic contract not found at specified address');
      }
      addTestResult('Logic Contract', 'success', `Verified at ${CONTRACT_ADDRESSES.TESTNET.LOGIC}`);
    } catch (error) {
      addTestResult('Logic Contract', 'error', `Failed to verify: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return;
    }

    // Test 6: Check Contract Service
    try {
      if (!contractService) {
        throw new Error('Contract service not initialized');
      }
      addTestResult('Contract Service', 'success', 'Contract service initialized successfully');
    } catch (error) {
      addTestResult('Contract Service', 'error', `Contract service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return;
    }

    // Test 7: Get Expert Count
    try {
      const count = await contractService.getExpertSize();
      setExpertCount(count);
      addTestResult('Get Expert Count', 'success', `Current expert count: ${count}`);
    } catch (error) {
      addTestResult('Get Expert Count', 'error', `Failed to get expert count: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testJoinExpert = async () => {
    try {
      setLoading(true);
      if (!contractService) throw new Error('Contract service not initialized');
      
      const result = await contractService.joinExpert(testTikTokId, testEmail);
      addTestResult(
        'Join Expert', 
        'success', 
        `Successfully joined as expert with TikTok ID: ${testTikTokId}`
      );
      
      // Refresh expert count
      const count = await contractService.getExpertSize();
      setExpertCount(count);
    } catch (error) {
      addTestResult(
        'Join Expert', 
        'error', 
        `Failed to join as expert: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setLoading(false);
    }
  };

  const testBuyTSC = async () => {
    try {
      setLoading(true);
      if (!contractService) throw new Error('Contract service not initialized');
      
      const web3 = new Web3(window.ethereum!);
      
      // Convert purchase amount to wei
      const purchaseAmountWei = web3.utils.toWei(purchaseAmount, 'ether');
      
      console.log('Creating TUSDT contract instance...');
      const tusdtContract = new web3.eth.Contract(
        ERC20_ABI,
        CONTRACT_ADDRESSES.TESTNET.TUSDT
      );
      
      console.log('Approving TUSDT spend...');
      const approveTx = await tusdtContract.methods
        .approve(CONTRACT_ADDRESSES.TESTNET.LOGIC, purchaseAmountWei)
        .send({ from: walletAddress });
      
      console.log('TUSDT approved:', approveTx);
      addTestResult('TUSDT Approval', 'success', `Approved ${purchaseAmount} TUSDT for spending`);

      console.log('Buying TSC...');
      const buyTx = await contractService.buyTSC(purchaseAmountWei);
      console.log('Buy transaction:', buyTx);
      addTestResult('Buy TSC', 'success', `Successfully purchased ${purchaseAmount} TSC`);
      
      // Refresh balances
      await checkBalances();
    } catch (error) {
      console.error('Buy TSC error:', error);
      addTestResult(
        'Buy TSC', 
        'error', 
        `Failed to buy TSC: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setLoading(false);
    }
  };

  const requestTestUSDT = async () => {
    try {
      setLoading(true);
      if (!walletAddress) {
        throw new Error('Please connect your wallet first');
      }

      const web3 = new Web3(window.ethereum!);
      const chainId = await web3.eth.getChainId();
      if (Number(chainId) !== 97) {
        throw new Error('Please switch to BSC Testnet');
      }

      const balance = await web3.eth.getBalance(walletAddress);
      if (parseFloat(web3.utils.fromWei(balance, 'ether')) < 0.01) {
        throw new Error('Insufficient BNB for gas. Please get test BNB from faucet');
      }

      // Try to get TUSDT through the Logic contract with modified gas settings
      const logicContract = new web3.eth.Contract([{
        "inputs": [],
        "name": "getTestUSDT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }] as any, CONTRACT_ADDRESSES.TESTNET.LOGIC);

      console.log('Requesting test USDT...');
      const tx = await logicContract.methods.getTestUSDT()
        .send({ 
          from: walletAddress,
          gas: '300000', // Increased gas limit
          gasPrice: web3.utils.toWei('10', 'gwei') // Explicit gas price
        });
      
      console.log('TUSDT request transaction:', tx);
      addTestResult('TUSDT Faucet', 'success', `Successfully received test TUSDT. Transaction: ${tx.transactionHash}`);
      
      // Refresh balances
      await checkBalances();
    } catch (error: any) {
      console.error('TUSDT request error:', error);
      let errorMessage = 'Failed to get test TUSDT: ';
      
      if (error.message.includes('User denied')) {
        errorMessage += 'Transaction was rejected';
      } else if (error.message.includes('insufficient funds')) {
        errorMessage += 'Insufficient BNB for gas fees. Please get test BNB first';
      } else if (error.receipt) {
        // Handle contract revert
        errorMessage += 'Contract error. You may need to wait before requesting again';
      } else {
        errorMessage += error.message || 'Unknown error occurred';
      }
      
      addTestResult('TUSDT Faucet', 'error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const testLogicContract = async () => {
    try {
      setLoading(true);
      if (!contractService) throw new Error('Contract service not initialized');

      // Test 1: Get Expert Count
      const expertCount = await contractService.getExpertSize();
      addTestResult('Logic: Expert Count', 'success', `Total experts: ${expertCount}`);
      setExpertCount(expertCount);

      // Test 2: Get Brand Count
      const brandCount = await contractService.getBrandSize();
      addTestResult('Logic: Brand Count', 'success', `Total brands: ${brandCount}`);
      setBrandCount(brandCount);

      // Test 3: Get Invitation Count
      if (walletAddress) {
        const invitationCount = await contractService.getInvitationSize(walletAddress);
        addTestResult('Logic: Invitation Count', 'success', `Your invitations: ${invitationCount}`);
        setInvitationCount(invitationCount);

        // Test 4: Get Expert Info
        const experts = await contractService.getExpertInfo();
        const isExpert = experts.some(expert => 
          expert._add.toLowerCase() === walletAddress.toLowerCase()
        );
        addTestResult(
          'Logic: Expert Status', 
          'success', 
          isExpert ? 'You are registered as an expert' : 'You are not registered as an expert'
        );
      }

    } catch (error) {
      addTestResult(
        'Logic Contract Test', 
        'error', 
        `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-cyan to-brand-pink bg-clip-text text-transparent">
          Web3 Integration Test
        </h1>

        {/* Balance Display */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-brand-cyan/20 bg-black/50">
            <div className="text-sm text-gray-400">TUSDT Balance</div>
            <div className="text-xl font-bold text-brand-cyan">{usdtBalance} TUSDT</div>
            <button
              onClick={requestTestUSDT}
              disabled={loading}
              className="mt-2 px-4 py-2 bg-brand-cyan/20 hover:bg-brand-cyan/30 text-brand-cyan text-sm rounded-lg transition-colors w-full disabled:opacity-50"
            >
              {loading ? 'Requesting...' : 'Get Test TUSDT'}
            </button>
          </div>
          <div className="p-4 rounded-lg border border-brand-pink/20 bg-black/50">
            <div className="text-sm text-gray-400">TSC Balance</div>
            <div className="text-xl font-bold text-brand-pink">{tscBalance} TSC</div>
          </div>
        </div>

        {/* Contract Interaction Testing */}
        <div className="space-y-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-xl blur opacity-75"></div>
            <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Test Contract Interactions</h2>
              
              {/* Join as Expert */}
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold text-brand-cyan">Join as Expert</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="TikTok ID"
                    value={testTikTokId}
                    onChange={(e) => setTestTikTokId(e.target.value)}
                    className="px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <button
                  onClick={testJoinExpert}
                  disabled={loading || !testTikTokId || !testEmail}
                  className="relative group w-full disabled:opacity-50"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-lg blur opacity-60 group-hover:opacity-100 transition"></div>
                  <div className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center justify-center">
                    <span className="text-xl font-medium text-white">
                      {loading ? 'Processing...' : 'Join as Expert'}
                    </span>
                  </div>
                </button>
              </div>

              {/* Buy TSC */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-brand-pink">Buy TSC</h3>
                <input
                  type="number"
                  placeholder="Amount of TSC to buy"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white"
                />
                <button
                  onClick={testBuyTSC}
                  disabled={loading || !purchaseAmount || Number(purchaseAmount) <= 0}
                  className="relative group w-full disabled:opacity-50"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-lg blur opacity-60 group-hover:opacity-100 transition"></div>
                  <div className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center justify-center">
                    <span className="text-xl font-medium text-white">
                      {loading ? 'Processing...' : 'Buy TSC'}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Network Controls */}
        <div className="space-y-4">
          <button
            onClick={switchToBSCTestnet}
            className="relative group w-full"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-lg blur opacity-60 group-hover:opacity-100 transition"></div>
            <div className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center justify-center">
              <span className="text-xl font-medium text-white">Switch to BSC Testnet</span>
            </div>
          </button>
        </div>

        {/* Faucet Link */}
        <div className="text-center">
          <a 
            href="https://testnet.binance.org/faucet-smart"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-cyan hover:text-brand-pink transition-colors"
          >
            Get Test BNB from Faucet
          </a>
        </div>

        {/* Test Controls */}
        <div className="space-y-4">
          <button
            onClick={runTests}
            className="relative group w-full"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-lg blur opacity-60 group-hover:opacity-100 transition"></div>
            <div className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center justify-center">
              <span className="text-xl font-medium text-white">Run Tests</span>
            </div>
          </button>
        </div>

        {/* Test Results */}
        <div className="space-y-4">
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result.status === 'success' 
                  ? 'border-green-500/50 bg-green-500/10' 
                  : 'border-red-500/50 bg-red-500/10'
              }`}
            >
              <div className="font-medium mb-1">{result.test}</div>
              <div className={`text-sm ${
                result.status === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {result.message}
              </div>
            </div>
          ))}
        </div>

        {/* Connection Status */}
        {contractError && (
          <div className="p-4 rounded-lg border border-red-500/50 bg-red-500/10">
            <div className="font-medium text-red-400">Contract Error</div>
            <div className="text-sm text-red-400">{contractError}</div>
          </div>
        )}

        {/* Add Logic Contract Testing Section */}
        <div className="space-y-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-xl blur opacity-75"></div>
            <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Logic Contract Status</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg border border-brand-cyan/20 bg-black/50">
                  <div className="text-sm text-gray-400">Total Experts</div>
                  <div className="text-xl font-bold text-brand-cyan">{expertCount}</div>
                </div>
                <div className="p-4 rounded-lg border border-brand-pink/20 bg-black/50">
                  <div className="text-sm text-gray-400">Total Brands</div>
                  <div className="text-xl font-bold text-brand-pink">{brandCount}</div>
                </div>
                <div className="p-4 rounded-lg border border-white/20 bg-black/50">
                  <div className="text-sm text-gray-400">Your Invitations</div>
                  <div className="text-xl font-bold text-white">{invitationCount}</div>
                </div>
              </div>

              <button
                onClick={testLogicContract}
                disabled={loading}
                className="relative group w-full disabled:opacity-50"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-pink rounded-lg blur opacity-60 group-hover:opacity-100 transition"></div>
                <div className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center justify-center">
                  <span className="text-xl font-medium text-white">
                    {loading ? 'Testing...' : 'Test Logic Contract'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 