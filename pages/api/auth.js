import { verifyUser, generateToken, createUser } from '../../lib/auth'
import { openDb } from '../../lib/db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { action, username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
      const db = await openDb();

      if (action === 'signup') {
        console.log('Starting signup process for username:', username);
        
        // Check if user already exists
        const existingUser = await db.get('SELECT * FROM users WHERE username = ?', username);
        if (existingUser) {
          return res.status(409).json({ message: 'Username already exists' });
        }

        const userId = await createUser(db, username, password);
        console.log('User created with ID:', userId);
        
        if (!userId) {
          return res.status(500).json({ message: 'User creation failed' });
        }

        const token = generateToken(userId);
        console.log('Token generated successfully');
        res.status(201).json({ token, username });

      } else if (action === 'login') {
        const user = await verifyUser(db, username, password);
        if (user) {
          const token = generateToken(user.id);
          res.status(200).json({ token, username: user.username });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }

      } else {
        res.status(400).json({ message: 'Invalid action' });
      }

    } catch (error) {
      console.error('Auth error:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}