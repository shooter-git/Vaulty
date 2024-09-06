import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Server-side authentication functions
export async function createUser(db, username, password) {
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const result = await db.run(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [username, hashedPassword]
    )
    return result.lastID
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export async function verifyUser(db, username, password) {
  const user = await db.get('SELECT * FROM users WHERE username = ?', username)
  if (user && await bcrypt.compare(password, user.password_hash)) {
    return user
  }
  return null
}

export function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Client-side authentication context
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUsername = localStorage.getItem('username')
    if (token && storedUsername) {
      setIsAuthenticated(true)
      setUsername(storedUsername)
    }
  }, [])

  const login = async (username, password) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password })
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Authentication failed')
      }
      const { token, username: responseUsername } = await response.json()
      localStorage.setItem('token', token)
      localStorage.setItem('username', responseUsername)
      setIsAuthenticated(true)
      setUsername(responseUsername)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const signup = async (username, password) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'signup', username, password })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Signup failed')
      }

      const { token, username: responseUsername } = await response.json()
      localStorage.setItem('token', token)
      localStorage.setItem('username', responseUsername)
      setIsAuthenticated(true)
      setUsername(responseUsername)
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setIsAuthenticated(false)
    setUsername(null)
    router.push('/login') // Redirect to the login page
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}