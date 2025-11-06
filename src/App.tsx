import { useState } from 'react';
import { Search } from 'lucide-react';
import { WalletInput } from './components/WalletInput';
import { ChainSelector } from './components/ChainSelector';
import { TransactionResults } from './components/TransactionResults';
import { SUPPORTED_CHAINS } from './config/chains';
import { getTransactionCount, isValidAddress } from './services/blockchain';
import { TransactionCount } from './types';
import { supabase } from './lib/supabase';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedChains, setSelectedChains] = useState<string[]>(
    SUPPORTED_CHAINS.map(c => c.id)
  );
  const [results, setResults] = useState<TransactionCount[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleToggleChain = (chainId: string) => {
    setSelectedChains(prev =>
      prev.includes(chainId)
        ? prev.filter(id => id !== chainId)
        : [...prev, chainId]
    );
  };

  const handleSelectAll = () => {
    setSelectedChains(SUPPORTED_CHAINS.map(c => c.id));
  };

  const handleDeselectAll = () => {
    setSelectedChains([]);
  };

  const handleSearch = async () => {
    setError('');

    if (!walletAddress.trim()) {
      setError('Please enter a wallet address');
      return;
    }

    if (!isValidAddress(walletAddress)) {
      setError('Please enter a valid Ethereum address');
      return;
    }

    if (selectedChains.length === 0) {
      setError('Please select at least one chain');
      return;
    }

    setIsSearching(true);

    const initialResults: TransactionCount[] = selectedChains.map(chainId => ({
      chain: chainId,
      count: 0,
      loading: true
    }));

    setResults(initialResults);

    const promises = selectedChains.map(async (chainId) => {
      try {
        const count = await getTransactionCount(walletAddress, chainId);
        return { chain: chainId, count, loading: false };
      } catch (err) {
        return {
          chain: chainId,
          count: 0,
          loading: false,
          error: err instanceof Error ? err.message : 'Unknown error'
        };
      }
    });

    const completedResults = await Promise.all(promises);
    setResults(completedResults);
    setIsSearching(false);

    const totalTransactions = completedResults.reduce((sum, r) => sum + r.count, 0);

    await supabase.from('wallet_history').insert({
      wallet_address: walletAddress,
      chains: selectedChains,
      total_transactions: totalTransactions
    }).catch(() => {
      // Table may not exist yet, that's ok
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Multi-Chain Transaction Counter
          </h1>
          <p className="text-gray-600 text-lg">
            Track transaction counts across multiple blockchain networks
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <WalletInput
            value={walletAddress}
            onChange={setWalletAddress}
            onSubmit={handleSearch}
            isLoading={isSearching}
          />

          <ChainSelector
            selectedChains={selectedChains}
            onToggleChain={handleToggleChain}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
          />

          {error && (
            <div className="w-full max-w-2xl bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleSearch}
            disabled={isSearching || selectedChains.length === 0 || !walletAddress}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors shadow-lg disabled:cursor-not-allowed"
          >
            <Search className="h-5 w-5" />
            <span>{isSearching ? 'Searching...' : 'Search Transactions'}</span>
          </button>

          {results.length > 0 && (
            <TransactionResults results={results} walletAddress={walletAddress} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
