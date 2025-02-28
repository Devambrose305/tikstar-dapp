import Web3, { Contract, ContractAbi } from 'web3';
import { CONTRACT_ADDRESSES, CONTRACT_FUNCTIONS } from '@/config/contracts';
import { Expert, Brand, UserBuy } from '@/types/contracts';

export class ContractService {
  private web3: Web3;
  private contract: Contract<ContractAbi> | null;

  constructor(provider: any, contractABI: ContractAbi) {
    this.web3 = new Web3(provider);
    this.contract = null;
    this.initializeContract(contractABI);
  }

  private initializeContract(contractABI: ContractAbi) {
    try {
      this.contract = new this.web3.eth.Contract(
        contractABI,
        CONTRACT_ADDRESSES.TESTNET.LOGIC
      );
    } catch (error) {
      console.error('Failed to initialize contract:', error);
    }
  }

  // Expert Functions
  async joinExpert(tikTokId: string, email: string): Promise<boolean> {
    try {
      if (!this.contract) throw new Error('Contract not initialized');
      const accounts = await this.web3.eth.getAccounts();
      await this.contract.methods[CONTRACT_FUNCTIONS.JOIN_EXPERT](tikTokId, email)
        .send({ from: accounts[0] });
      return true;
    } catch (error) {
      console.error('Failed to join as expert:', error);
      return false;
    }
  }

  async getExpertSize(): Promise<number> {
    try {
      if (!this.contract) throw new Error('Contract not initialized');
      const size = await this.contract.methods[CONTRACT_FUNCTIONS.GET_EXPERT_SIZE]().call();
      return Number(size);
    } catch (error) {
      console.error('Failed to get expert size:', error);
      return 0;
    }
  }

  async getExpertInfo(): Promise<Expert[]> {
    try {
      if (!this.contract) throw new Error('Contract not initialized');
      return await this.contract.methods[CONTRACT_FUNCTIONS.GET_EXPERT_INFO]().call();
    } catch (error) {
      console.error('Failed to get expert info:', error);
      return [];
    }
  }

  // Invitation Functions
  async acceptInvitation(upAddress: string): Promise<boolean> {
    try {
      if (!this.contract) throw new Error('Contract not initialized');
      const accounts = await this.web3.eth.getAccounts();
      await this.contract.methods[CONTRACT_FUNCTIONS.ACCEPT_INVITATION](upAddress)
        .send({ from: accounts[0] });
      return true;
    } catch (error) {
      console.error('Failed to accept invitation:', error);
      return false;
    }
  }

  async getInvitationSize(address: string): Promise<number> {
    try {
      if (!this.contract) throw new Error('Contract not initialized');
      const size = await this.contract.methods[CONTRACT_FUNCTIONS.GET_INVITATION_SIZE](address).call();
      return Number(size);
    } catch (error) {
      console.error('Failed to get invitation size:', error);
      return 0;
    }
  }

  async getInvitationInfo(address: string): Promise<UserBuy[]> {
    try {
      if (!this.contract) throw new Error('Contract not initialized');
      return await this.contract.methods[CONTRACT_FUNCTIONS.GET_INVITATION_INFO](address).call();
    } catch (error) {
      console.error('Failed to get invitation info:', error);
      return [];
    }
  }

  // Brand Functions
  async getBrandSize(): Promise<number> {
    try {
      if (!this.contract) throw new Error('Contract not initialized');
      const size = await this.contract.methods[CONTRACT_FUNCTIONS.GET_BRAND_SIZE]().call();
      return Number(size);
    } catch (error) {
      console.error('Failed to get brand size:', error);
      return 0;
    }
  }

  async getBrandInfo(): Promise<Brand[]> {
    try {
      if (!this.contract) throw new Error('Contract not initialized');
      return await this.contract.methods[CONTRACT_FUNCTIONS.GET_BRAND_INFO]().call();
    } catch (error) {
      console.error('Failed to get brand info:', error);
      return [];
    }
  }

  // Purchase Functions
  async buyTSC(amount: string): Promise<boolean> {
    try {
      if (!this.contract) throw new Error('Contract not initialized');
      const accounts = await this.web3.eth.getAccounts();
      await this.contract.methods[CONTRACT_FUNCTIONS.BUY_TSC](amount)
        .send({ from: accounts[0] });
      return true;
    } catch (error) {
      console.error('Failed to buy TSC:', error);
      return false;
    }
  }
} 