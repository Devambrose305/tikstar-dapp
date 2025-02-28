import { AbiItem } from 'web3-utils';

export interface Expert {
  tikTokId: string;
  email: string;
  _add: string; // address
}

export interface Brand {
  name: string;
  remarks: string;
  logo: string;
}

export interface UserBuy {
  _add: string; // address
  amount: string; // uint256
}

export interface ContractEvent {
  JoinExpert: {
    tikTokId: string;
    email: string;
    _add: string;
    time: number;
  };
  AcceptInvitation: {
    msgadd: string;
    upadd: string;
  };
  Buy: {
    _add: string;
    _payAmount: string;
    _TSCAmount: string;
    _up: string;
    _UpTSCAmount: string;
  };
}

export type ContractABI = AbiItem[]; 