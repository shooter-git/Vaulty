import { createContext, useContext, useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (passcode) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      })
      if (!response.ok) throw new Error('Authentication failed')
      const { token } = await response.json()
      localStorage.setItem('token', token)
      setIsAuthenticated(true)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

// Server-side functions
export function verifyPasscode(passcode) {
  // TODO: Implement secure passcode verification
  // This is a placeholder implementation and should be replaced with a secure method
  return passcode === process.env.SECURE_PASSCODE
}

export function generateToken() {
  // TODO: Implement secure token generation
  return jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export function verifyToken(token) {
  try {
    jwt.verify(token, process.env.JWT_SECRET)
    return true
  } catch (error) {
    return false
  }
}