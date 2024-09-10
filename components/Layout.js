import Head from 'next/head'
import { useTheme } from '../lib/themeContext'
import Navbar from './NavBar'
import { useEffect } from 'react'

export default function Layout({ children }) {
  const { themeName } = useTheme()

  useEffect(() => {
    document.documentElement.className = themeName === 'synthwave' ? 'dark' : '';
  }, [themeName]);

  return (
    <div className="min-h-screen flex flex-col bg-kali-primary dark:bg-synthwave-primary">
      <Head>
        <title>Vaulty</title>
        <meta name="description" content="A secure password manager PWA" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content={themeName === 'synthwave' ? '#1f1b24' : '#0c0c0c'} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      <div className="safe-top">
        <Navbar />
      </div>

      <main className="flex-grow w-full overflow-auto pt-safe">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 h-full">
          {children}
        </div>
      </main>
    </div>
  )
}