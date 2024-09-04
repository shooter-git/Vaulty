import Head from 'next/head'
import { useAuth } from '../lib/auth'

export default function Layout({ children }) {
  const { isAuthenticated, logout } = useAuth()

  return (
    <div className="container">
      <Head>
        <title>Secure Clipboard PWA</title>
        <meta name="description" content="A secure password manager PWA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Secure Clipboard PWA</h1>
        {isAuthenticated && (
          <button onClick={logout}>Logout</button>
        )}
      </header>

      <main>{children}</main>

      <footer>
        <p>&copy; 2024 Secure Clipboard PWA. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        header, footer {
          padding: 1rem;
          background: #f0f0f0;
        }
        main {
          flex: 1;
          padding: 1rem;
        }
      `}</style>
    </div>
  )
}