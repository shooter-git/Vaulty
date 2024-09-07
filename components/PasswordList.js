import { useState, useEffect } from 'react'
import PasswordEntry from './PasswordEntry'
import AddPasswordModal from './AddPasswordModal'

export default function PasswordList() {
  const [passwords, setPasswords] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPasswords()
  }, [])

  const fetchPasswords = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const token = localStorage.getItem('token')
      const response = await fetch('/api/passwords', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPasswords(data);
      } else {
        throw new Error('Failed to fetch passwords');
      }
    } catch (error) {
      console.error('Error fetching passwords:', error);
      setError('Failed to fetch passwords. Please try again.');
    } finally {
      setIsLoading(false)
    }
  };

  const handleAddPassword = async (newPassword) => {
    try {
      setError(null)
      const token = localStorage.getItem('token')
      const response = await fetch('/api/passwords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newPassword)
      });

      if (response.ok) {
        const addedPassword = await response.json();
        setPasswords(prevPasswords => [...prevPasswords, addedPassword]);
        setIsModalOpen(false);
      } else {
        throw new Error('Failed to add password');
      }
    } catch (error) {
      console.error('Error adding password:', error);
      setError('Failed to add password. Please try again.');
    }
  }

  const handleEditPassword = async (id, updatedPassword) => {
    try {
      setError(null)
      const token = localStorage.getItem('token')
      const response = await fetch('/api/passwords', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, ...updatedPassword })
      });

      if (response.ok) {
        setPasswords(prevPasswords => 
          prevPasswords.map(p => p.id === id ? { ...p, ...updatedPassword } : p)
        );
      } else {
        throw new Error('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Failed to update password. Please try again.');
    }
  }

  const handleDeletePassword = async (id) => {
    try {
      setError(null)
      const token = localStorage.getItem('token')
      const response = await fetch('/api/passwords', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        setPasswords(prevPasswords => prevPasswords.filter(p => p.id !== id));
      } else {
        throw new Error('Failed to delete password');
      }
    } catch (error) {
      console.error('Error deleting password:', error);
      setError('Failed to delete password. Please try again.');
    }
  }

  if (isLoading) {
    return <div className="text-center text-kali-text dark:text-synthwave-text">Loading passwords...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-kali-text dark:text-synthwave-text">Passwords</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-kali-accent dark:bg-synthwave-accent text-black dark:text-black rounded hover:opacity-80 transition-opacity"
        >
          Add Password
        </button>
      </div>
      {error && (
        <p className="text-red-500 mb-4 p-2 bg-red-100 border border-red-400 rounded">
          {error}
        </p>
      )}
      {passwords.length === 0 ? (
        <p className="text-kali-text dark:text-synthwave-text text-center p-4 bg-kali-secondary dark:bg-synthwave-secondary rounded">
          No passwords added yet. Click "Add Password" to get started.
        </p>
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