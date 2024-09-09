import Head from 'next/head'
import { useTheme } from '../lib/themeContext'
import Navbar from './NavBar'
import { useEffect } from 'react'

export default function Layout({ children }) {
  const { themeName } = useTheme()

  useEffect(() => {
    // Apply the theme class to the root element
    document.documentElement.className = themeName === 'synthwave' ? 'dark' : '';
  }, [themeName]);

  return (
    <div className="full-height flex flex-col bg-kali-primary dark:bg-synthwave-primary">
      <Head>
        <title>Vaulty</title>
        <meta name="description" content="A secure password manager PWA" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content={themeName === 'synthwave' ? '#1f1b24' : '#0c0c0c'} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </Head>

      <Navbar />

      <main className="flex-grow w-full overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 h-full">
          {children}
        </div>
      </main>
    </div>
  )
}