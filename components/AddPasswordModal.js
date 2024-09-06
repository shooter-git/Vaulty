import { useState } from 'react'
import { generatePassword } from '../lib/passwordGenerator'

export default function AddPasswordModal({ isOpen, onClose, onAddPassword }) {
  const [description, setDescription] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddPassword({ description, password })
    setDescription('')
    setPassword('')
    onClose()
  }

  const handleGeneratePassword = () => {
    const newPassword = generatePassword()
    setPassword(newPassword)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-kali-secondary dark:bg-synthwave-secondary p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-kali-text dark:text-synthwave-text">Add New Password</h2>
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kali-accent focus:ring focus:ring-kali-accent focus:ring-opacity-50 dark:bg-synthwave-primary dark:text-synthwave-text"
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
                className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-kali-accent focus:ring focus:ring-kali-accent focus:ring-opacity-50 dark:bg-synthwave-primary dark:text-synthwave-text"
              />
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-kali-accent dark:bg-synthwave-accent text-sm text-kali-text dark:text-synthwave-text"
              >
                Generate
              </button>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-kali-accent dark:bg-synthwave-accent text-black dark:text-black rounded hover:opacity-80"
            >
              Add Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
