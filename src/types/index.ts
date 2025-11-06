export interface Chain {
  id: string;
  name: string;
  icon: string;
  apiEndpoint: string;
  explorer: string;
}

export interface TransactionCount {
  chain: string;
  count: number;
  loading: boolean;
  error?: string;
}

export interface WalletHistory {
  id: string;
  wallet_address: string;
  chains: string[];
  total_transactions: number;
  searched_at: string;
}
