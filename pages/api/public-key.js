import { verifyToken } from '../../lib/auth-server';
import { runQuery, getQuery } from '../../lib/db';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const userId = decoded.userId;

  try {
    switch (req.method) {
      case 'POST':
        const { publicKey } = req.body;
        if (!publicKey) {
          return res.status(400).json({ message: 'Public key is required' });
        }
        await storePublicKey(userId, publicKey);
        res.status(200).json({ message: 'Public key stored successfully' });
        break;

      case 'GET':
        const storedPublicKey = await getPublicKey(userId);
        if (storedPublicKey) {
          res.status(200).json({ publicKey: storedPublicKey });
        } else {
          res.status(404).json({ message: 'Public key not found' });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in public key operation:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

async function storePublicKey(userId, publicKey) {
  const sql = 'INSERT OR REPLACE INTO user_keys (user_id, public_key) VALUES (?, ?)';
  await runQuery(sql, [userId, publicKey]);
}

async function getPublicKey(userId) {
  const sql = 'SELECT public_key FROM user_keys WHERE user_id = ?';
  const result = await getQuery(sql, [userId]);
  return result[0]?.public_key;
}