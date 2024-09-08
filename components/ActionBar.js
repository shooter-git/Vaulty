import React from 'react';
import SearchBar from './SearchBar';

export default function ActionBar({ onSearch, sortOrder, onToggleSort, onAddPassword }) {
  return (
    <div className="bg-kali-secondary dark:bg-synthwave-secondary p-2 mb-3 rounded-md flex items-center">
      <div className="flex-grow mr-2">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleSort}
          className="flex-shrink-0 px-2 py-2 text-sm bg-kali-primary dark:bg-synthwave-primary text-kali-text dark:text-synthwave-text rounded-md hover:opacity-80 transition-opacity"
          aria-label={`Sort ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
        >
          {sortOrder === 'asc' ? '▲' : '▼'}
        </button>
        <button
          onClick={onAddPassword}
          className="flex-shrink-0 px-2 py-2 text-xs sm:text-sm bg-kali-accent dark:bg-synthwave-accent text-black dark:text-black rounded-md hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          Add Password
        </button>
      </div>
    </div>
  );
}