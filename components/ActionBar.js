import React from 'react';
import SearchBar from './SearchBar';

export default function ActionBar({ onSearch, sortOrder, onToggleSort, onAddPassword }) {
  return (
    <div className="bg-kali-secondary dark:bg-synthwave-secondary p-2 mb-3 rounded-md flex flex-wrap items-center gap-2 landscape:flex-nowrap">
      <div className="w-full sm:w-auto sm:flex-grow sm:min-w-0 sm:max-w-[50%] mb-2 sm:mb-0 landscape:w-auto landscape:mb-0 landscape:flex-grow">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="flex w-full sm:w-auto justify-between sm:justify-start space-x-2 landscape:w-auto landscape:justify-end">
        <button
          onClick={onToggleSort}
          className="flex-1 sm:flex-none px-3 py-2 text-xs sm:text-sm bg-kali-primary dark:bg-synthwave-primary text-kali-text dark:text-synthwave-text rounded-md hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          Sort {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
        <button
          onClick={onAddPassword}
          className="flex-1 sm:flex-none px-3 py-2 text-xs sm:text-sm bg-kali-accent dark:bg-synthwave-accent text-black dark:text-black rounded-md hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          Add Password
        </button>
      </div>
    </div>
  );
}