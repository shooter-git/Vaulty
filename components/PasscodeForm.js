import { useState } from 'react'

export default function PasscodeForm({ onSubmit }) {
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (passcode.length < 6 || passcode.length > 12) {
      setError('Passcode must be between 6 and 12 digits')
      return
    }

    try {
      await onSubmit(passcode)
    } catch (err) {
      setError('Invalid passcode. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center">Enter Passcode</h2>
      <input
        type="password"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
        placeholder="Enter 6-12 digit passcode"
        className="w-full p-2 border rounded"
        minLength={6}
        maxLength={12}
        required
        autoComplete="current-password"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full p-2 bg-kali-accent dark:bg-synthwave-accent text-kali-text dark:text-synthwave-text rounded hover:opacity-80 transition-opacity"
      >
        Submit
      </button>
    </form>
  )
}