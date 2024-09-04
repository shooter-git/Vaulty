import { useState, useEffect } from 'react'
import PasswordEntry from './PasswordEntry'

export default function PasswordList() {
  const [passwords, setPasswords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPasswords()
  }, [])

  const fetchPasswords = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/passwords', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch passwords')
      const data = await response.json()
      setPasswords(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div className="text-center py-4">Loading passwords...</div>
  if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Your Passwords</h2>
      {passwords.length === 0 ? (
        <p className="text-center">No passwords stored yet.</p>
      ) : (
        passwords.map(pwd => (
          <PasswordEntry key={pwd.id} password={pwd} />
        ))
      )}
    </div>
  )
}