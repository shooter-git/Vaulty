import { useState } from 'react'
import { generatePassword } from '../lib/passwordGenerator'
import { encryptPassword } from '../lib/encryption'

export default function AddPasswordForm({ onAddPassword }) {
  const [description, setDescription] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const encryptedPassword = encryptPassword(password)
    onAddPassword({ description, password: encryptedPassword })
    setDescription('')
    setPassword('')
  }

  const handleGeneratePassword = () => {
    const newPassword = generatePassword()
    setPassword(newPassword)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4">
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kali-accent focus:ring focus:ring-kali-accent focus:ring-opacity-50 dark:bg-synthwave-secondary dark:text-synthwave-text"
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
            className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-kali-accent focus:ring focus:ring-kali-accent focus:ring-opacity-50 dark:bg-synthwave-secondary dark:text-synthwave-text"
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
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-kali-text dark:text-synthwave-text bg-kali-accent dark:bg-synthwave-accent hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kali-accent dark:focus:ring-synthwave-accent"
      >
        Add Password
      </button>
    </form>
  )
}