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
    <form onSubmit={handleSubmit} className="passcode-form">
      <h2>Enter Passcode</h2>
      <input
        type="password"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
        placeholder="Enter 6-12 digit passcode"
        minLength={6}
        maxLength={12}
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Submit</button>

      <style jsx>{`
        .passcode-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          max-width: 300px;
          margin: 0 auto;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          font-size: 1rem;
        }
        .error {
          color: red;
        }
        button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          cursor: pointer;
        }
      `}</style>
    </form>
  )
}