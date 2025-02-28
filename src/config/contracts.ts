export const CONTRACT_ADDRESSES = {
  TESTNET: {
    TUSDT: '0xfA6d5d51bc2f5868B9f2A5Df217554697218605F',
    TTSC: '0x3efdEB8EE99EC221e8b4610489eEaF22D512cD10',
    LOGIC: '0x715d6D1a0879998b3f1b1A490D0c28942aB294ce'
  }
};

export const SUPPORTED_NETWORKS = {
  BSC_TESTNET: 97,
  BSC_MAINNET: 56
};

// Contract function names
export const CONTRACT_FUNCTIONS = {
  JOIN_EXPERT: 'joinExpert',
  ACCEPT_INVITATION: 'acceptInvitation',
  BUY_TSC: 'buy',
  GET_EXPERT_SIZE: 'getExpertSize',
  GET_EXPERT_INFO: 'getExpertInfo',
  GET_INVITATION_SIZE: 'getInvitationSize',
  GET_INVITATION_INFO: 'getInvitationInfo',
  GET_BRAND_SIZE: 'getBrandSize',
  GET_BRAND_INFO: 'getBrandInfo'
};

// Contract events
export const CONTRACT_EVENTS = {
  JOIN_EXPERT: 'JoinExpert',
  ACCEPT_INVITATION: 'AcceptInvitation',
  BUY: 'Buy'
}; 