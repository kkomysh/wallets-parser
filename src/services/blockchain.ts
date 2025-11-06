import { SUPPORTED_CHAINS } from '../config/chains';

export async function getTransactionCount(walletAddress: string, chainId: string): Promise<number> {
  const chain = SUPPORTED_CHAINS.find(c => c.id === chainId);

  if (!chain) {
    throw new Error(`Chain ${chainId} not supported`);
  }

  try {
    const url = `${chain.apiEndpoint}?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === '1' && data.result) {
      return parseInt(data.message.split('records')[0].trim()) || data.result.length;
    }

    return 0;
  } catch (error) {
    console.error(`Error fetching transactions for ${chain.name}:`, error);
    throw new Error(`Failed to fetch transactions from ${chain.name}`);
  }
}

export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
