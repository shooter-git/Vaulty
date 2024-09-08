import Head from 'next/head'
import { useTheme } from '../lib/themeContext'
import Navbar from './NavBar'

export default function Layout({ children }) {
  const { themeName } = useTheme()

  return (
    <div className={`min-h-screen flex flex-col ${themeName === 'synthwave' ? 'dark' : ''}`}>
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

      <main className="flex-grow container mx-auto px-2 sm:px-4 md:px-6 py-4 bg-kali-primary dark:bg-synthwave-primary text-kali-text dark:text-synthwave-text">
        {children}
      </main>
    </div>
  )
}