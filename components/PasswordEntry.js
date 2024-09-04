import { useState } from 'react'

export default function PasswordEntry({ password }) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password.password)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
      
      // Set a timeout to clear the clipboard after 10 seconds
      setTimeout(() => {
        navigator.clipboard.writeText('')
      }, 10000)
    } catch (err) {
      console.error('Failed to copy password:', err)
    }
  }

  return (
    <div className="password-entry">
      <span className="description">{password.description}</span>
      <button onClick={copyToClipboard}>
        {isCopied ? 'Copied!' : 'Copy'}
      </button>

      <style jsx>{`
        .password-entry {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border: 1px solid #ddd;
          margin-bottom: 10px;
        }
        .description {
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}