import { useState, useEffect } from 'react'
import PasswordEntry from './PasswordEntry'
import AddPasswordModal from './AddPasswordModal'

export default function PasswordList() {
  const [passwords, setPasswords] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchPasswords()
  }, [])

  const fetchPasswords = async () => {
    // Implement API call to fetch passwords
    // For now, we'll use an empty array
    setPasswords([])
  }

  const handleAddPassword = async (newPassword) => {
    // Implement API call to add a new password
    // For now, we'll just add it to the local state
    setPasswords([...passwords, { id: Date.now(), ...newPassword }])
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-kali-text dark:text-synthwave-text">Passwords</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-kali-accent dark:bg-synthwave-accent text-kali-text dark:text-synthwave-text rounded hover:opacity-80"
        >
          Add Password
        </button>
      </div>
      {passwords.length === 0 ? (
        <p className="text-kali-text dark:text-synthwave-text">No passwords added yet. Click "Add Password" to get started.</p>
      ) : (
        <div className="space-y-4">
          {passwords.map((password) => (
            <PasswordEntry key={password.id} password={password} />
          ))}
        </div>
      )}
      <AddPasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPassword={handleAddPassword}
      />
    </div>
  )
}