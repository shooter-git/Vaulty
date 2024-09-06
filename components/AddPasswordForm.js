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
          className="mt-1 block w-full px-3 py-2 text-base rounded-md border-kali-accent dark:border-synthwave-accent bg-kali-primary dark:bg-synthwave-primary text-kali-text dark:text-synthwave-text focus:border-kali-accent dark:focus:border-synthwave-accent focus:ring focus:ring-kali-accent dark:focus:ring-synthwave-accent focus:ring-opacity-50"
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
            className="flex-1 px-3 py-2 text-base rounded-l-md border-kali-accent dark:border-synthwave-accent bg-kali-primary dark:bg-synthwave-primary text-kali-text dark:text-synthwave-text focus:border-kali-accent dark:focus:border-synthwave-accent focus:ring focus:ring-kali-accent dark:focus:ring-synthwave-accent focus:ring-opacity-50"
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
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black dark:text-black bg-kali-accent dark:bg-synthwave-accent hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kali-accent dark:focus:ring-synthwave-accent"
      >
        Add Password
      </button>
    </form>
  )
}