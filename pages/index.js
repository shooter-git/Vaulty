import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth'
import PasswordList from '../components/PasswordList'

export default function Home() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null // or a loading indicator
  }

  return (
    <div>
      {/* <h1 className="text-2xl font-bold mb-4">Secure Clipboard PWA</h1> */}
      <PasswordList />
    </div>
  )
}