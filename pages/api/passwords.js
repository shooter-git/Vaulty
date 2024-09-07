import { verifyToken } from '../../lib/auth'
import { encryptPassword as encrypt, decryptPassword as decrypt } from '../../lib/encryption'
import { getPasswords, getPassword, addPassword, updatePassword, deletePassword } from '../../lib/db'

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const userId = decoded.userId;

  switch (req.method) {
    case 'GET':
      try {
        console.log('Fetching passwords for user:', userId);
        const passwords = await getPasswords(userId);
        console.log('Fetched passwords:', passwords);
        res.status(200).json(passwords);
      } catch (error) {
        console.error('Error retrieving passwords:', error);
        res.status(500).json({ message: 'Error retrieving passwords' });
      }
      break;

    case 'POST':
      try {
        const { description, password } = req.body;
        const encryptedPassword = encrypt(password);
        console.log('Adding password for user:', userId);
        const id = await addPassword(userId, description, encryptedPassword);
        console.log('Password added with id:', id);
        res.status(201).json({ id, description });
      } catch (error) {
        console.error('Error creating password:', error);
        res.status(500).json({ message: 'Error creating password', error: error.message });
      }
      break;

    case 'PUT':
      try {
        const { id, description, password } = req.body;
        const encryptedPassword = encrypt(password);
        await updatePassword(id, userId, description, encryptedPassword);
        res.status(200).json({ message: 'Password updated successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error updating password' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        await deletePassword(id, userId);
        res.status(200).json({ message: 'Password deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting password' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}