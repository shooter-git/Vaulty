import { useState } from 'react'
import { useAuth } from '../lib/auth'
import PasswordList from '../components/PasswordList'
import PasscodeForm from '../components/PasscodeForm'
import SignUp from '../components/SignUp'

export default function Home() {
  const { isAuthenticated, login, signup } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-10">
        {showSignUp ? (
          <>
            <SignUp onSignUp={signup} />
            <p className="mt-4 text-center">
              Already have an account?{' '}
              <button onClick={() => setShowSignUp(false)} className="text-kali-accent dark:text-synthwave-accent">
                Log in
              </button>
            </p>
          </>
        ) : (
          <>
            <PasscodeForm onSubmit={login} />
            <p className="mt-4 text-center">
              Don't have an account?{' '}
              <button onClick={() => setShowSignUp(true)} className="text-kali-accent dark:text-synthwave-accent">
                Sign up
              </button>
            </p>
          </>
        )}
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Secure Clipboard PWA</h1>
      <PasswordList />
    </div>
  )
}