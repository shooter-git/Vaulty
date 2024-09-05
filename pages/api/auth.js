import { verifyUser, generateToken, createUser } from '../../lib/auth'
import { openDb } from '../../lib/db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { action, username, password } = req.body;

    if (action === 'signup') {
      try {
        const db = await openDb();
        const userId = await createUser(db, username, password);
        if (!userId) {
          return res.status(400).json({ message: 'User creation failed' });
        }
        const token = generateToken(userId);
        res.status(201).json({ token, username });
      } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else if (action === 'login') {
      const user = await verifyUser(username, password)
      if (user) {
        const token = generateToken(user.id)
        res.status(200).json({ token, username: user.username })
      } else {
        res.status(401).json({ message: 'Invalid credentials' })
      }
    } else {
      res.status(400).json({ message: 'Invalid action' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}