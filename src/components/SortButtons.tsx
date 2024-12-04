import React from 'react';
import { SortOption } from '../types/Card';
import { ArrowUpDown } from 'lucide-react';

interface SortButtonsProps {
  onSort: (option: SortOption) => void;
  currentSort: SortOption | null;
}

export default function SortButtons({ onSort, currentSort }: SortButtonsProps) {
  const buttons: { label: string; value: SortOption }[] = [
    { label: 'マイル高還元率順', value: 'mileRate' },
    { label: 'ポイント高還元率順', value: 'pointRate' },
    { label: '年会費が安い順', value: 'annualFeeAsc' },
    { label: '年会費が高い順', value: 'annualFeeDsc' },
  ];

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <ArrowUpDown className="w-5 h-5 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-700">並び替え</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {buttons.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onSort(value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentSort === value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}