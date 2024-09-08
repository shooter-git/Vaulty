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
    <div className={`min-h-screen flex flex-col bg-kali-primary dark:bg-synthwave-primary`}>
      <Head>
        <title>Vaulty</title>
        <meta name="description" content="A secure password manager PWA" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="theme-color" content="#00FF00" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>

      <Navbar />

      <main className="flex-grow w-full text-kali-text dark:text-synthwave-text overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 h-full">
          {children}
        </div>
      </main>
    </div>
  )
}