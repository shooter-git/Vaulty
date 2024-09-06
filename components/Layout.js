import Head from 'next/head'
import { useState } from 'react'
import { useAuth } from '../lib/auth'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../lib/themeContext'

export default function Layout({ children }) {
  const { isAuthenticated, username, logout } = useAuth()
  const { themeName } = useTheme()
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => setShowDropdown(!showDropdown)

  const handleLogout = () => {
    logout() // This will now handle the logout and redirection
    setShowDropdown(false) // Close the dropdown after logout
  }

  return (
    <div className={`min-h-screen flex flex-col ${themeName === 'synthwave' ? 'dark' : ''}`}>
      <Head>
        <title>Vaulty</title>
        <meta name="description" content="A secure password manager PWA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-kali-secondary dark:bg-synthwave-secondary text-kali-text dark:text-synthwave-text p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Vaulty</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="bg-kali-accent dark:bg-synthwave-accent text-kali-text dark:text-synthwave-text px-3 py-1 rounded-full text-sm focus:outline-none"
                >
                  {username}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-kali-secondary dark:bg-synthwave-secondary rounded-md shadow-lg py-1">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-kali-text dark:text-synthwave-text hover:bg-kali-primary dark:hover:bg-synthwave-primary"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
    </div>
  )
}