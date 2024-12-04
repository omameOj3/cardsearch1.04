import React from 'react';
import { Card } from '../types/Card';

interface CardListProps {
  cards: Card[];
}

export default function CardList({ cards }: CardListProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {cards.map(card => (
        <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
              <a 
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-48 md:w-48 flex-shrink-0"
              >
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  className="w-full h-auto object-contain hover:opacity-90 transition-opacity"
                />
              </a>
              <div className="flex-1 w-full">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-center md:text-left">{card.name}</h3>
                
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 px-4 text-left bg-gray-50 w-32">
                        <span className="text-sm font-medium text-gray-700">国際ブランド</span>
                      </th>
                      <td className="py-2 px-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={card.brandImageUrl}
                            alt={card.brand}
                            className="h-6 w-auto"
                          />
                          <span className="text-sm font-medium">{card.brand}</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 px-4 text-left bg-gray-50">
                        <span className="text-sm font-medium text-gray-700">年会費</span>
                      </th>
                      <td className="py-2 px-4">
                        <p className="text-sm">
                          初年度: <span className="font-medium">{card.firstYearFee}</span><br />
                          次年度以降: <span className="font-medium">{card.annualFee}</span>
                        </p>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 px-4 text-left bg-gray-50">
                        <span className="text-sm font-medium text-gray-700">還元率</span>
                      </th>
                      <td className="py-2 px-4">
                        <p className="text-sm">
                          ポイント: <span className="font-medium">{card.pointRate}</span><br />
                          マイル: <span className="font-medium">{card.mileRate || '-'}</span>
                        </p>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 px-4 text-left bg-gray-50">
                        <span className="text-sm font-medium text-gray-700">追加カード</span>
                      </th>
                      <td className="py-2 px-4">
                        <p className="text-sm">
                          枚数: <span className="font-medium">{card.additionalCards}</span><br />
                          年会費: <span className="font-medium">{card.additionalCardFee}</span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-6 text-center md:text-left">
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto text-center"
              >
                詳細を見る
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}