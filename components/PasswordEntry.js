import { useState } from 'react'
import { decryptPassword } from '../lib/encryption'

export default function PasswordEntry({ password, onEdit, onDelete }) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      const decryptedPassword = decryptPassword(password.encrypted_password)
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(decryptedPassword)
      } else {
        // Fallback for browsers that don't support the Clipboard API
        const textArea = document.createElement("textarea")
        textArea.value = decryptedPassword
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }

      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
      
      // Set a timeout to clear the clipboard after 10 seconds
      setTimeout(() => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('')
        }
      }, 10000)
    } catch (err) {
      console.error('Failed to copy password:', err)
    }
  }

  const handleCopyClick = (e) => {
    e.preventDefault() // Prevent default touch behavior
    copyToClipboard()
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      onDelete(password.id)
    }
  }

  return (
    <div className="flex justify-between items-center p-3 bg-kali-secondary dark:bg-synthwave-secondary rounded-md">
      <span className="text-sm text-kali-text dark:text-synthwave-text">{password.description}</span>
      <div className="space-x-2">
        <button
          onClick={handleCopyClick}
          onTouchStart={handleCopyClick}
          className="px-3 py-2 bg-kali-accent dark:bg-synthwave-accent text-black dark:text-black rounded-md hover:opacity-80 transition-opacity text-sm"
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}