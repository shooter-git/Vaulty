import { useState, useEffect } from 'react'
import { useAuth } from '../lib/auth'
import PasswordList from '../components/PasswordList'
import PasscodeForm from '../components/PasscodeForm'

export default function Home() {
  const { isAuthenticated, login } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication status
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <PasscodeForm onSubmit={login} />
  }

  return (
    <div>
      <h1>Secure Clipboard PWA</h1>
      <PasswordList />
    </div>
  )
}