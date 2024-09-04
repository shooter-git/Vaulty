import { verifyToken } from '../../lib/auth'
import { encrypt, decrypt } from '../../lib/encryption'
import { getPasswords, getPassword, addPassword, updatePassword, deletePassword } from '../../lib/db'

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  console.log('Token verified successfully');

  switch (req.method) {
    case 'GET':
      try {
        const passwords = await getPasswords()
        res.status(200).json(passwords)
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving passwords' })
      }
      break

    case 'POST':
      try {
        const { description, password } = req.body
        const encryptedPassword = encrypt(password)
        const id = await addPassword(description, encryptedPassword)
        res.status(201).json({ id, description })
      } catch (error) {
        res.status(500).json({ message: 'Error creating password' })
      }
      break

    case 'PUT':
      try {
        const { id, description, password } = req.body
        const encryptedPassword = encrypt(password)
        await updatePassword(id, description, encryptedPassword)
        res.status(200).json({ message: 'Password updated successfully' })
      } catch (error) {
        res.status(500).json({ message: 'Error updating password' })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.body
        await deletePassword(id)
        res.status(200).json({ message: 'Password deleted successfully' })
      } catch (error) {
        res.status(500).json({ message: 'Error deleting password' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}