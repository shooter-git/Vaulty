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

  const addPassword = async (description, password) => {
    try {
      const response = await fetch('/api/passwords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ description, password })
      })
      if (!response.ok) throw new Error('Failed to add password')
      fetchPasswords()
    } catch (err) {
      setError(err.message)
    }
  }

  if (isLoading) return <div>Loading passwords...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2>Your Passwords</h2>
      {passwords.map(pwd => (
        <PasswordEntry key={pwd._id} password={pwd} />
      ))}
      <button onClick={() => addPassword('New Password', 'password123')}>Add Password</button>
    </div>
  )
}