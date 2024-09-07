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
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto p-4 bg-kali-primary dark:bg-synthwave-primary text-kali-text dark:text-synthwave-text">
        {children}
      </main>
    </div>
  )
}