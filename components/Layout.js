import Head from 'next/head'
import { useAuth } from '../lib/auth'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../lib/themeContext'

export default function Layout({ children }) {
  const { isAuthenticated, logout } = useAuth()
  const { themeName } = useTheme()

  return (
    <div className={`min-h-screen flex flex-col ${themeName === 'synthwave' ? 'dark' : ''}`}>
      <Head>
        <title>Secure Clipboard PWA</title>
        <meta name="description" content="A secure password manager PWA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-kali-secondary dark:bg-synthwave-secondary text-kali-text dark:text-synthwave-text p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Secure Clipboard PWA</h1>
          {isAuthenticated && (
            <button onClick={logout} className="bg-kali-accent dark:bg-synthwave-accent text-kali-text dark:text-synthwave-text px-4 py-2 rounded hover:opacity-80 transition-opacity">Logout</button>
          )}
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      <footer className="bg-kali-secondary dark:bg-synthwave-secondary text-kali-text dark:text-synthwave-text p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Secure Clipboard PWA. All rights reserved.</p>
        </div>
      </footer>

      <ThemeToggle />
    </div>
  )
}