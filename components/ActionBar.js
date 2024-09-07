import React from 'react';
import SearchBar from './SearchBar';

export default function ActionBar({ onSearch, sortOrder, onToggleSort, onAddPassword }) {
  return (
    <div className="bg-kali-secondary dark:bg-synthwave-secondary p-2 mb-4 rounded-md flex flex-wrap items-center gap-2">
      <div className="flex-grow min-w-0 max-w-[50%]">
        <SearchBar onSearch={onSearch} />
      </div>
      <button
        onClick={onToggleSort}
        className="px-3 py-2 text-sm bg-kali-primary dark:bg-synthwave-primary text-kali-text dark:text-synthwave-text rounded-md hover:opacity-80 transition-opacity whitespace-nowrap"
      >
        Sort {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
      <button
        onClick={onAddPassword}
        className="px-3 py-2 text-sm bg-kali-accent dark:bg-synthwave-accent text-black dark:text-black rounded-md hover:opacity-80 transition-opacity whitespace-nowrap"
      >
        Add Password
      </button>
    </div>
  );
}