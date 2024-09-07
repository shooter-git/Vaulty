import { verifyUser, generateToken, createUser } from '../../lib/auth-server'
import { openDb, closeDb } from '../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { action, username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    await openDb();
    console.log('Database connection opened');

    if (action === 'signup') {
      console.log('Starting signup process for username:', username);
      
      try {
        const userId = await createUser(username, password);
        console.log('User created with ID:', userId);
        
        const token = generateToken(userId);
        console.log('Token generated successfully');
        res.status(201).json({ token, username });
      } catch (error) {
        console.error('Error in signup process:', error);
        console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        if (error.message === 'Username already exists') {
          return res.status(409).json({ message: 'Username already exists' });
        }
        throw error;
      }
    } else if (action === 'login') {
      console.log('Starting login process for username:', username);
      
      const user = await verifyUser(username, password);
      if (user) {
        const token = generateToken(user.id);
        console.log('Login successful, token generated');
        res.status(200).json({ token, username: user.username });
      } else {
        console.log('Login failed: Invalid credentials');
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      console.log('Invalid action requested:', action);
      res.status(400).json({ message: 'Invalid action' });
    }
  } catch (error) {
    console.error('Auth error:', error);
    console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    res.status(500).json({ message: 'Internal server error', error: error.message });
  } finally {
    await closeDb();
    console.log('Database connection closed');
  }
}