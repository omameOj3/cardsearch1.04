import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <a 
          href="https://mileage-master.com/"
          className="text-gray-900 hover:text-gray-700 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          トップページに戻る
        </a>
      </div>
    </header>
  );
}