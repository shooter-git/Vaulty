import '../styles/globals.css'
import Layout from '../components/Layout'
import { AuthProvider } from '../lib/auth'
import { ThemeProvider } from '../lib/themeContext'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp