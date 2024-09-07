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
      className="w-full px-3 py-2 text-sm bg-kali-primary dark:bg-synthwave-primary text-kali-text dark:text-synthwave-text rounded-md focus:outline-none focus:ring-2 focus:ring-kali-accent dark:focus:ring-synthwave-accent placeholder-kali-text dark:placeholder-synthwave-text placeholder-opacity-50"
    />
  )
}