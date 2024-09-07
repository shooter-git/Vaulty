import { useState } from 'react'
import { decryptPassword, encryptPassword } from '../lib/encryption'
import { generatePassword } from '../lib/passwordGenerator'

export default function PasswordEntry({ password, onEdit, onDelete }) {
  const [isCopied, setIsCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(password.description)
  const [editedPassword, setEditedPassword] = useState('')
  const [error, setError] = useState(null)

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
      setError('Failed to copy password. Please try again.')
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setIsEditing(false) // Reset editing state when collapsing
      setError(null) // Clear any existing errors
    }
  }

  const handleEdit = () => {
    try {
      setIsEditing(true)
      setEditedDescription(password.description)
      const decrypted = decryptPassword(password.encrypted_password)
      setEditedPassword(decrypted)
      setError(null)
    } catch (err) {
      console.error('Failed to decrypt password:', err)
      setError('Failed to edit password. Please try again.')
      setIsEditing(false)
    }
  }

  const handleSave = () => {
    try {
      const updatedPassword = {
        id: password.id,
        description: editedDescription,
        encrypted_password: encryptPassword(editedPassword)
      }
      onEdit(password.id, updatedPassword)
      setIsEditing(false)
      setError(null)
    } catch (err) {
      console.error('Failed to save password:', err)
      setError('Failed to save password. Please try again.')
    }
  }

  const handleGeneratePassword = () => {
    try {
      const newPassword = generatePassword() // You can add parameters here if needed
      setEditedPassword(newPassword)
      setError(null)
    } catch (err) {
      console.error('Failed to generate password:', err)
      setError('Failed to generate password. Please try again.')
    }
  }

  const buttonClass = "px-3 py-2 text-sm rounded-md hover:opacity-80 transition-opacity"
  const primaryButtonClass = `${buttonClass} bg-kali-accent dark:bg-synthwave-accent text-black dark:text-black`
  const secondaryButtonClass = `${buttonClass} bg-kali-secondary dark:bg-synthwave-secondary text-kali-text dark:text-synthwave-text`

  return (
    <div className="bg-kali-secondary dark:bg-synthwave-secondary rounded-md overflow-hidden">
      <div className="flex justify-between items-center p-3">
        <span className="text-sm text-kali-text dark:text-synthwave-text">{password.description}</span>
        <div className="flex space-x-2">
          <button
            onClick={handleCopyClick}
            onTouchStart={handleCopyClick}
            className={primaryButtonClass}
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={toggleExpand}
            className={secondaryButtonClass}
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="p-3 bg-kali-primary dark:bg-synthwave-primary">
          {error && (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          )}
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full px-3 py-2 bg-kali-secondary dark:bg-synthwave-secondary text-kali-text dark:text-synthwave-text rounded-md"
                placeholder="Description"
              />
              <div className="flex space-x-2">
                <input
                  type="password"
                  value={editedPassword}
                  onChange={(e) => setEditedPassword(e.target.value)}
                  className="flex-grow px-3 py-2 bg-kali-secondary dark:bg-synthwave-secondary text-kali-text dark:text-synthwave-text rounded-md"
                  placeholder="New Password"
                />
                <button
                  onClick={handleGeneratePassword}
                  className={primaryButtonClass}
                >
                  Generate
                </button>
              </div>
              <div className="flex justify-end space-x-2">
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
            <div className="flex justify-end space-x-2">
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