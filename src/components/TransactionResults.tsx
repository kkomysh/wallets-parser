import { ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { TransactionCount } from '../types';
import { SUPPORTED_CHAINS } from '../config/chains';

interface TransactionResultsProps {
  results: TransactionCount[];
  walletAddress: string;
}

export function TransactionResults({ results, walletAddress }: TransactionResultsProps) {
  const totalTransactions = results.reduce((sum, r) => sum + r.count, 0);
  const isLoading = results.some(r => r.loading);

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-900">Transaction Summary</h2>
          <p className="text-sm text-gray-500 mt-1 break-all">{walletAddress}</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
            <p className="text-4xl font-bold text-blue-600">
              {isLoading ? (
                <Loader2 className="h-10 w-10 animate-spin mx-auto" />
              ) : (
                totalTransactions.toLocaleString()
              )}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {results.map((result) => {
            const chain = SUPPORTED_CHAINS.find(c => c.id === result.chain);
            if (!chain) return null;

            return (
              <div
                key={result.chain}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{chain.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{chain.name}</p>
                    <a
                      href={`${chain.explorer}/address/${walletAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      View on Explorer
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <div className="text-right">
                  {result.loading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                  ) : result.error ? (
                    <div className="flex items-center gap-2 text-red-500">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">Error</span>
                    </div>
                  ) : (
                    <p className="text-xl font-bold text-gray-900">
                      {result.count.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
