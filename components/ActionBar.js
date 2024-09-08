import React from 'react';
import SearchBar from './SearchBar';

export default function ActionBar({ onSearch, sortOrder, onToggleSort, onAddPassword }) {
  return (
    <div className="bg-kali-secondary dark:bg-synthwave-secondary p-2 mb-3 rounded-md flex flex-wrap items-center gap-2 landscape:flex-nowrap landscape:gap-1">
      <div className="w-full sm:w-auto sm:flex-grow sm:min-w-0 sm:max-w-[50%] mb-2 sm:mb-0 landscape:w-4/5 landscape:mb-0 landscape:flex-grow landscape:max-w-none">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="flex w-full sm:w-auto justify-between sm:justify-start space-x-2 landscape:w-auto landscape:justify-end landscape:flex-shrink-0 landscape:space-x-1 landscape:ml-auto">
        <button
          onClick={onToggleSort}
          className="flex-1 sm:flex-none px-3 py-2 text-xs sm:text-sm bg-kali-primary dark:bg-synthwave-primary text-kali-text dark:text-synthwave-text rounded-md hover:opacity-80 transition-opacity whitespace-nowrap landscape:px-2 landscape:py-1"
        >
          Sort {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
        <button
          onClick={onAddPassword}
          className="flex-1 sm:flex-none px-3 py-2 text-xs sm:text-sm bg-kali-accent dark:bg-synthwave-accent text-black dark:text-black rounded-md hover:opacity-80 transition-opacity whitespace-nowrap landscape:px-2 landscape:py-1"
        >
          Add Password
        </button>
      </div>
    </div>
  );
}