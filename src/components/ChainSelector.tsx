import { SUPPORTED_CHAINS } from '../config/chains';

interface ChainSelectorProps {
  selectedChains: string[];
  onToggleChain: (chainId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export function ChainSelector({
  selectedChains,
  onToggleChain,
  onSelectAll,
  onDeselectAll
}: ChainSelectorProps) {
  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700">Select Chains</h3>
        <div className="space-x-2">
          <button
            onClick={onSelectAll}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            Select All
          </button>
          <span className="text-gray-400">|</span>
          <button
            onClick={onDeselectAll}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            Deselect All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {SUPPORTED_CHAINS.map((chain) => (
          <button
            key={chain.id}
            onClick={() => onToggleChain(chain.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedChains.includes(chain.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{chain.icon}</span>
              <span className="font-medium text-sm">{chain.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
