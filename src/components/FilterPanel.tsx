import React, { useState, useEffect } from 'react';
import { FilterOptions, SortOption } from '../types/Card';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import SortButtons from './SortButtons';

interface FilterPanelProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  onSort: (option: SortOption) => void;
  currentSort: SortOption | null;
}

export default function FilterPanel({ filters, setFilters, onSort, currentSort }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold
        setIsOpen(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleSelectChange = (category: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: value === '' ? [] : [value]
    }));
  };

  const handleBooleanChange = (category: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: value === 'true'
    }));
  };

  return (
    <div className="sticky top-0 bg-white z-10 p-4 shadow-md rounded-lg transition-all duration-300">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold">検索条件</h2>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label={isOpen ? '検索メニューを閉じる' : '検索メニューを開く'}
        >
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {isOpen && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
            {/* Mile Rate */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">マイル還元率</label>
              <select
                className="w-full min-w-[140px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={filters.mileRate[0] || ''}
                onChange={(e) => handleSelectChange('mileRate', e.target.value)}
              >
                <option value="">指定なし</option>
                <option value="0.5%以上">0.5%以上</option>
                <option value="1.0%以上">1.0%以上</option>
              </select>
            </div>

            {/* Point Rate */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">ポイント還元率</label>
              <select
                className="w-full min-w-[140px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={filters.pointRate[0] || ''}
                onChange={(e) => handleSelectChange('pointRate', e.target.value)}
              >
                <option value="">指定なし</option>
                <option value="0.5%以上">0.5%以上</option>
                <option value="1.0%以上">1.0%以上</option>
                <option value="1.5%以上">1.5%以上</option>
              </select>
            </div>

            {/* Annual Fee */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">年会費</label>
              <select
                className="w-full min-w-[140px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={filters.annualFee[0] || ''}
                onChange={(e) => handleSelectChange('annualFee', e.target.value)}
              >
                <option value="">指定なし</option>
                <option value="無料">無料</option>
                <option value="5,000円以下">5,000円以下</option>
                <option value="10,000円以下">10,000円以下</option>
                <option value="20,000円以下">20,000円以下</option>
                <option value="20,000円超">20,000円超</option>
              </select>
            </div>

            {/* Brand */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">国際ブランド</label>
              <select
                className="w-full min-w-[140px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={filters.brand[0] || ''}
                onChange={(e) => handleSelectChange('brand', e.target.value)}
              >
                <option value="">指定なし</option>
                <option value="VISA">VISA</option>
                <option value="Mastercard">Mastercard</option>
                <option value="AMEX">AMEX</option>
                <option value="JCB">JCB</option>
                <option value="ダイナースクラブ">ダイナースクラブ</option>
              </select>
            </div>

            {/* Priority Pass */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">プライオリティ・パス</label>
              <select
                className="w-full min-w-[140px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={filters.priorityPass.toString()}
                onChange={(e) => handleBooleanChange('priorityPass', e.target.value)}
              >
                <option value="false">指定なし</option>
                <option value="true">付帯あり</option>
              </select>
            </div>

            {/* ETC Card */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">ETCカード</label>
              <select
                className="w-full min-w-[140px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={filters.etcCard.toString()}
                onChange={(e) => handleBooleanChange('etcCard', e.target.value)}
              >
                <option value="false">指定なし</option>
                <option value="true">無料</option>
              </select>
            </div>
          </div>

          <SortButtons onSort={onSort} currentSort={currentSort} />
        </>
      )}
    </div>
  );
}