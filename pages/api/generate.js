import { verifyToken } from '../../lib/auth-server'
import { generatePassword } from '../../lib/passwordGenerator'

export default async function handler(req, res) {
  // Verify JWT token
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }

  if (req.method === 'POST') {
    try {
      const { length = 16, includeNumbers = true, includeSymbols = true } = req.body
      const password = generatePassword(length, includeNumbers, includeSymbols)
      res.status(200).json({ password })
    } catch (error) {
      console.error('Error generating password:', error)
      res.status(500).json({ message: 'Error generating password' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}