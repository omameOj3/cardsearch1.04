import React, { useState, useMemo } from 'react';
import { FilterOptions, SortOption } from './types/Card';
import { cards } from './data/cards';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import CardList from './components/CardList';

function App() {
  const [filters, setFilters] = useState<FilterOptions>({
    annualFee: [],
    brand: [],
    additionalCards: [],
    pointRate: [],
    mileRate: [],
    priorityPass: false,
    etcCard: false,
    insurance: false,
  });

  const [currentSort, setCurrentSort] = useState<SortOption | null>(null);

  const filteredCards = useMemo(() => {
    let result = cards.filter(card => {
      if (filters.annualFee.length > 0) {
        const fee = parseInt(card.annualFee.replace(/[^0-9]/g, '')) || 0;
        const matches = filters.annualFee.some(filter => {
          if (filter === '無料') return card.annualFee === '無料';
          const maxFee = parseInt(filter.replace(/[^0-9]/g, ''));
          if (filter.includes('超')) return fee > maxFee;
          return fee <= maxFee;
        });
        if (!matches) return false;
      }

      if (filters.pointRate.length > 0) {
        const rate = parseFloat(card.pointRate?.replace(/[^0-9.]/g, '')) || 0;
        const matches = filters.pointRate.some(filter => {
          const minRate = parseFloat(filter.replace(/[^0-9.]/g, ''));
          return rate >= minRate;
        });
        if (!matches) return false;
      }

      if (filters.mileRate.length > 0) {
        const rate = parseFloat(card.mileRate?.replace(/[^0-9.]/g, '')) || 0;
        const matches = filters.mileRate.some(filter => {
          const minRate = parseFloat(filter.replace(/[^0-9.]/g, ''));
          return rate >= minRate;
        });
        if (!matches) return false;
      }

      if (filters.brand.length > 0) {
        const selectedBrand = filters.brand[0].toUpperCase();
        const normalizedCardBrands = card.brand.toUpperCase().split('/').map(b => b.trim());
        
        if (selectedBrand === 'VISA') {
          return normalizedCardBrands.some(brand => brand === 'VISA');
        }
        
        return normalizedCardBrands.includes(selectedBrand);
      }

      if (filters.priorityPass && !card.priorityPass) {
        return false;
      }

      if (filters.etcCard && card.etcFee !== '無料') {
        return false;
      }

      if (filters.insurance && !card.insurance.includes('億')) {
        return false;
      }

      return true;
    });

    // Apply sorting
    if (currentSort) {
      result = [...result].sort((a, b) => {
        switch (currentSort) {
          case 'mileRate': {
            const rateA = parseFloat(a.mileRate?.replace(/[^0-9.]/g, '') || '0');
            const rateB = parseFloat(b.mileRate?.replace(/[^0-9.]/g, '') || '0');
            return rateB - rateA;
          }
          case 'pointRate': {
            const rateA = parseFloat(a.pointRate?.replace(/[^0-9.]/g, '') || '0');
            const rateB = parseFloat(b.pointRate?.replace(/[^0-9.]/g, '') || '0');
            return rateB - rateA;
          }
          case 'annualFeeAsc': {
            const feeA = parseInt(a.annualFee.replace(/[^0-9]/g, '') || '0');
            const feeB = parseInt(b.annualFee.replace(/[^0-9]/g, '') || '0');
            return feeA - feeB;
          }
          case 'annualFeeDsc': {
            const feeA = parseInt(a.annualFee.replace(/[^0-9]/g, '') || '0');
            const feeB = parseInt(b.annualFee.replace(/[^0-9]/g, '') || '0');
            return feeB - feeA;
          }
          default:
            return 0;
        }
      });
    }

    return result;
  }, [filters, currentSort]);

  const handleSort = (option: SortOption) => {
    setCurrentSort(currentSort === option ? null : option);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          ビジネスカード検索
        </h1>
        
        <div className="space-y-8">
          <FilterPanel 
            filters={filters} 
            setFilters={setFilters} 
            onSort={handleSort}
            currentSort={currentSort}
          />
          <CardList cards={filteredCards} />
        </div>
      </div>
    </div>
  );
}

export default App;