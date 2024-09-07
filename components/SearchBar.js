import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search..."
      className="flex-grow px-3 py-2 text-sm bg-kali-secondary dark:bg-synthwave-secondary text-kali-text dark:text-synthwave-text rounded-md focus:outline-none focus:ring-2 focus:ring-kali-accent dark:focus:ring-synthwave-accent"
    />
  )
}