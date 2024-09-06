import { useState } from 'react'
import { useAuth } from '../lib/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(username, password)
      router.push('/')
    } catch (err) {
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-kali-secondary dark:bg-synthwave-secondary rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-kali-text dark:text-synthwave-text">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-kali-text dark:text-synthwave-text">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-required="true"
            className="mt-1 block w-full px-3 py-2 text-base rounded-md border-kali-accent dark:border-synthwave-accent bg-kali-primary dark:bg-synthwave-primary text-kali-text dark:text-synthwave-text focus:border-kali-accent dark:focus:border-synthwave-accent focus:ring focus:ring-kali-accent dark:focus:ring-synthwave-accent focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-kali-text dark:text-synthwave-text">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
            className="mt-1 block w-full px-3 py-2 text-base rounded-md border-kali-accent dark:border-synthwave-accent bg-kali-primary dark:bg-synthwave-primary text-kali-text dark:text-synthwave-text focus:border-kali-accent dark:focus:border-synthwave-accent focus:ring focus:ring-kali-accent dark:focus:ring-synthwave-accent focus:ring-opacity-50"
          />
        </div>
        {error && <p role="alert" className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black dark:text-black bg-kali-accent dark:bg-synthwave-accent hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kali-accent dark:focus:ring-synthwave-accent"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-kali-text dark:text-synthwave-text">
        Don't have an account?{' '}
        <Link href="/signup" className="text-kali-accent dark:text-synthwave-accent hover:text-opacity-80">
          Sign up here
        </Link>
      </p>
    </div>
  )
}