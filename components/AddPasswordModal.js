import { useState } from 'react'
import { generatePassword } from '../lib/passwordGenerator'

export default function AddPasswordModal({ isOpen, onClose, onAddPassword }) {
  const [description, setDescription] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddPassword({ description, password })
    setDescription('')
    setPassword('')
    setError('')
    onClose()
  }

  const handleGeneratePassword = () => {
    try {
      const newPassword = generatePassword()
      setPassword(newPassword)
      setError('')
    } catch (err) {
      console.error('Error generating password:', err)
      setError('Failed to generate password. Please try again or enter manually.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-kali-secondary dark:bg-synthwave-secondary p-6 rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-kali-text dark:text-synthwave-text">Add New Password</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-kali-text dark:text-synthwave-text">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-kali-primary dark:bg-synthwave-primary text-kali-text dark:text-synthwave-text rounded-md border-kali-accent dark:border-synthwave-accent focus:border-kali-accent dark:focus:border-synthwave-accent focus:ring focus:ring-kali-accent dark:focus:ring-synthwave-accent focus:ring-opacity-50 text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-kali-text dark:text-synthwave-text">
              Password
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex-1 px-3 py-2 bg-kali-primary dark:bg-synthwave-primary text-kali-text dark:text-synthwave-text rounded-l-md border-kali-accent dark:border-synthwave-accent focus:border-kali-accent dark:focus:border-synthwave-accent focus:ring focus:ring-kali-accent dark:focus:ring-synthwave-accent focus:ring-opacity-50 text-sm"
              />
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-kali-accent dark:border-synthwave-accent bg-kali-accent dark:bg-synthwave-accent text-black dark:text-black hover:bg-opacity-80 text-sm"
              >
                Generate
              </button>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-kali-primary dark:bg-synthwave-primary text-kali-text dark:text-synthwave-text rounded-md hover:bg-opacity-80 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-kali-accent dark:bg-synthwave-accent text-black dark:text-black rounded-md hover:bg-opacity-80 text-sm"
            >
              Add Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}