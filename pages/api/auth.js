import { verifyUser, createUser, generateTokens, storeRefreshToken } from '../../lib/auth-server';

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
    console.log('Auth request received:', { action, username });

    if (action === 'login') {
      console.log('Starting login process for username:', username);
      
      const user = await verifyUser(username, password);
      if (user) {
        const { accessToken, refreshToken } = generateTokens(user.id);
        await storeRefreshToken(user.id, refreshToken);
        console.log('Login successful, tokens generated for user:', user.id);
        
        // Set the refresh token as an HTTP-only cookie
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`);
        
        res.status(200).json({ accessToken, username: user.username });
      } else {
        console.log('Login failed: Invalid credentials for username:', username);
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else if (action === 'signup') {
      console.log('Starting signup process for username:', username);
      
      try {
        const userId = await createUser(username, password);
        console.log('User created with ID:', userId);
        
        const { accessToken, refreshToken } = generateTokens(userId);
        await storeRefreshToken(userId, refreshToken);
        console.log('Tokens generated successfully for new user:', userId);
        
        // Set the refresh token as an HTTP-only cookie
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`);
        
        res.status(201).json({ accessToken, username });
      } catch (error) {
        console.error('Error in signup process:', error);
        if (error.message === 'Username already exists') {
          return res.status(409).json({ message: 'Username already exists' });
        }
        throw error;
      }
    } else {
      console.log('Invalid action requested:', action);
      res.status(400).json({ message: 'Invalid action' });
    }
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}