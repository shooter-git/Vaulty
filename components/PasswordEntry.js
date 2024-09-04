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
    <div className="flex justify-between items-center p-4 bg-kali-secondary dark:bg-synthwave-secondary rounded-lg">
      <span className="font-semibold text-kali-text dark:text-synthwave-text">{password.description}</span>
      <button
        onClick={copyToClipboard}
        className="px-4 py-2 bg-kali-accent dark:bg-synthwave-accent text-kali-text dark:text-synthwave-text rounded hover:opacity-80 transition-opacity"
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}