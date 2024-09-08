import { useState } from 'react'
import { encryptWithPublicKey, decryptWithPrivateKey } from '../lib/clientEncryption'
import { generatePassword } from '../lib/passwordGenerator'

export default function PasswordEntry({ password, onEdit, onDelete }) {
  const [isCopied, setIsCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(password.description)
  const [editedPassword, setEditedPassword] = useState(password.password)
  const [error, setError] = useState(null)

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(password.password)
      } else {
        const textArea = document.createElement("textarea")
        textArea.value = password.password
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }

      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
      
      setTimeout(() => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('')
        }
      }, 10000)
    } catch (err) {
      console.error('Failed to copy password:', err)
      setError('Failed to copy password. Please try again.')
    }
  }

  const handleCopyClick = (e) => {
    e.preventDefault()
    copyToClipboard()
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      onDelete(password.id)
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setIsEditing(false)
      setError(null)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditedDescription(password.description)
    setEditedPassword(password.password)
    setError(null)
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token')
      const publicKeyResponse = await fetch('/api/public-key', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!publicKeyResponse.ok) {
        throw new Error('Failed to fetch public key')
      }
      const { publicKey } = await publicKeyResponse.json();

      const encryptedDescription = await encryptWithPublicKey(editedDescription, publicKey)
      const encryptedPassword = await encryptWithPublicKey(editedPassword, publicKey)

      const updatedPassword = {
        id: password.id,
        description: encryptedDescription,
        password: encryptedPassword
      }
      await onEdit(password.id, updatedPassword)
      setIsEditing(false)
      setError(null)
    } catch (err) {
      console.error('Failed to save password:', err)
      setError('Failed to save password. Please try again.')
    }
  }

  const handleGeneratePassword = () => {
    try {
      const newPassword = generatePassword()
      setEditedPassword(newPassword)
      setError(null)
    } catch (err) {
      console.error('Failed to generate password:', err)
      setError('Failed to generate password. Please try again.')
    }
  }

  const buttonClass = "px-2 py-1 text-xs rounded-md hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kali-accent dark:focus:ring-synthwave-accent"
  const primaryButtonClass = `${buttonClass} bg-kali-accent dark:bg-synthwave-accent text-black dark:text-black`
  const secondaryButtonClass = `${buttonClass} bg-kali-secondary dark:bg-synthwave-secondary text-kali-text dark:text-synthwave-text`

  return (
    <div className="bg-kali-secondary dark:bg-synthwave-secondary rounded-lg overflow-hidden shadow-sm">
      <div className="flex justify-between items-center p-2">
        <span className="text-xs sm:text-sm text-kali-text dark:text-synthwave-text truncate mr-2 flex-grow">
          {password.description}
        </span>
        <div className="flex space-x-1 flex-shrink-0">
          <button
            onClick={handleCopyClick}
            onTouchStart={handleCopyClick}
            className={primaryButtonClass}
          >
            {isCopied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={toggleExpand}
            className={secondaryButtonClass}
            aria-expanded={isExpanded}
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-2 bg-kali-primary dark:bg-synthwave-primary">
          {error && (
            <p className="text-red-500 text-xs mb-2">{error}</p>
          )}
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full px-2 py-1 text-xs bg-kali-secondary dark:bg-synthwave-secondary text-kali-text dark:text-synthwave-text rounded-md focus:outline-none focus:ring-2 focus:ring-kali-accent dark:focus:ring-synthwave-accent"
                placeholder="Description"
              />
              <div className="flex space-x-1">
                <input
                  type="password"
                  value={editedPassword}
                  onChange={(e) => setEditedPassword(e.target.value)}
                  className="flex-grow px-2 py-1 text-xs bg-kali-secondary dark:bg-synthwave-secondary text-kali-text dark:text-synthwave-text rounded-md focus:outline-none focus:ring-2 focus:ring-kali-accent dark:focus:ring-synthwave-accent"
                  placeholder="New Password"
                />
                <button
                  onClick={handleGeneratePassword}
                  className={`${primaryButtonClass} text-xs`}
                >
                  Generate
                </button>
              </div>
              <div className="flex justify-end space-x-1">
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setError(null)
                  }}
                  className={secondaryButtonClass}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className={primaryButtonClass}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end space-x-1">
              <button
                onClick={handleEdit}
                className={primaryButtonClass}
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className={secondaryButtonClass}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}