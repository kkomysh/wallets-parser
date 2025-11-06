import { Chain } from '../types';

export const SUPPORTED_CHAINS: Chain[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    icon: '⟠',
    apiEndpoint: 'https://api.etherscan.io/api',
    explorer: 'https://etherscan.io'
  },
  {
    id: 'bsc',
    name: 'BNB Chain',
    icon: '◆',
    apiEndpoint: 'https://api.bscscan.com/api',
    explorer: 'https://bscscan.com'
  },
  {
    id: 'polygon',
    name: 'Polygon',
    icon: '◇',
    apiEndpoint: 'https://api.polygonscan.com/api',
    explorer: 'https://polygonscan.com'
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    icon: '◊',
    apiEndpoint: 'https://api.arbiscan.io/api',
    explorer: 'https://arbiscan.io'
  },
  {
    id: 'optimism',
    name: 'Optimism',
    icon: '○',
    apiEndpoint: 'https://api-optimistic.etherscan.io/api',
    explorer: 'https://optimistic.etherscan.io'
  },
  {
    id: 'base',
    name: 'Base',
    icon: '▲',
    apiEndpoint: 'https://api.basescan.org/api',
    explorer: 'https://basescan.org'
  }
];
