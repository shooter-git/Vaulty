import { useState, useEffect } from 'react'
import PasswordEntry from './PasswordEntry'
import AddPasswordModal from './AddPasswordModal'
import ActionBar from './Actionbar'

export default function PasswordList() {
  const [passwords, setPasswords] = useState([])
  const [filteredPasswords, setFilteredPasswords] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    fetchPasswords()
  }, [])

  useEffect(() => {
    setFilteredPasswords(passwords)
  }, [passwords])

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

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  }

  const handleSearch = (searchTerm) => {
    const filtered = passwords.filter(password => 
      password.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPasswords(filtered);
  }

  const sortedPasswords = [...filteredPasswords].sort((a, b) => {
    const compareResult = a.description.localeCompare(b.description);
    return sortOrder === 'asc' ? compareResult : -compareResult;
  });

  if (isLoading) {
    return <div className="text-center text-kali-text dark:text-synthwave-text">Loading passwords...</div>
  }

  return (
    <div>
      <ActionBar 
        onSearch={handleSearch}
        sortOrder={sortOrder}
        onToggleSort={toggleSortOrder}
        onAddPassword={() => setIsModalOpen(true)}
      />
      {error && (
        <p className="text-red-500 mb-3 p-2 bg-red-100 border border-red-400 rounded text-sm">
          {error}
        </p>
      )}
      {sortedPasswords.length === 0 ? (
        <p className="text-kali-text dark:text-synthwave-text text-center p-3 bg-kali-secondary dark:bg-synthwave-secondary rounded text-sm">
          No passwords found. Add a new password or try a different search term.
        </p>
      ) : (
        <div className="space-y-3">
          {sortedPasswords.map((password) => (
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