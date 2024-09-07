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
    try {
      const response = await fetch('/api/passwords', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPasswords(data);
      } else {
        console.error('Failed to fetch passwords');
      }
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  };

  const handleAddPassword = async (newPassword) => {
    try {
      const response = await fetch('/api/passwords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newPassword)
      });

      if (response.ok) {
        const addedPassword = await response.json();
        setPasswords([...passwords, addedPassword]);
      } else {
        console.error('Failed to add password')
      }
    } catch (error) {
      console.error('Error adding password:', error);
    }
  }

  const handleEditPassword = async (id, updatedPassword) => {
    try {
      const response = await fetch(`/api/passwords`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ id, ...updatedPassword })
      });

      if (response.ok) {
        setPasswords(passwords.map(p => p.id === id ? { ...p, ...updatedPassword } : p));
      } else {
        console.error('Failed to update password')
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  }

  const handleDeletePassword = async (id) => {
    try {
      const response = await fetch(`/api/passwords`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        setPasswords(passwords.filter(p => p.id !== id));
      } else {
        console.error('Failed to delete password')
      }
    } catch (error) {
      console.error('Error deleting password:', error);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-kali-text dark:text-synthwave-text">Passwords</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-kali-accent dark:bg-synthwave-accent text-black dark:text-black rounded hover:opacity-80"
        >
          Add Password
        </button>
      </div>
      {passwords.length === 0 ? (
        <p className="text-kali-text dark:text-synthwave-text">No passwords added yet. Click "Add Password" to get started.</p>
      ) : (
        <div className="space-y-4">
          {passwords.map((password) => (
            <PasswordEntry 
              key={password.id} 
              password={password} 
              onEdit={handleEditPassword}
              onDelete={handleDeletePassword}
            />
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