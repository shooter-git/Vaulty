import { verifyPasscode, generateToken } from '../../lib/auth'
import { openDb } from '../../lib/db'

export default async function handler(req, res) {
  // Ensure database is initialized
  await openDb()

  if (req.method === 'POST') {
    try {
      const { passcode } = req.body

      // Verify passcode
      const isValid = await verifyPasscode(passcode)

      if (isValid) {
        // Generate JWT token
        const token = generateToken()
        res.status(200).json({ token })
      } else {
        res.status(401).json({ message: 'Invalid passcode' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}