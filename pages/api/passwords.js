import { verifyToken } from '../../lib/auth-server';
import { openDb, closeDb, runQuery, getQuery } from '../../lib/db';
import { encryptPassword, decryptPassword } from '../../lib/encryption';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const userId = decoded.userId;

  try {
    await openDb();

    switch (req.method) {
      case 'GET':
        const passwords = await getPasswords(userId);
        res.status(200).json(passwords);
        break;

      case 'POST':
        const { description, password } = req.body;
        if (!description || !password) {
          return res.status(400).json({ message: 'Description and password are required' });
        }
        const encryptedPassword = encryptPassword(password);
        const id = await addPassword(userId, description, encryptedPassword);
        res.status(201).json({ id, description });
        break;

      case 'PUT':
        const { id: updateId, description: updateDesc, password: updatePass } = req.body;
        const updatedEncryptedPassword = encryptPassword(updatePass);
        await updatePassword(updateId, userId, updateDesc, updatedEncryptedPassword);
        res.status(200).json({ message: 'Password updated successfully' });
        break;

      case 'DELETE':
        const { id: deleteId } = req.body;
        await deletePassword(deleteId, userId);
        res.status(200).json({ message: 'Password deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in password operation:', error);
    console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    res.status(500).json({ message: 'Internal server error', error: error.message });
  } finally {
    await closeDb();
  }
}

async function getPasswords(userId) {
  const sql = 'SELECT id, description, encrypted_password FROM passwords WHERE user_id = ?';
  return await getQuery(sql, [userId]) || [];
}

async function addPassword(userId, description, encryptedPassword) {
  const sql = 'INSERT INTO passwords (user_id, description, encrypted_password) VALUES (?, ?, ?)';
  try {
    const result = await runQuery(sql, [userId, description, encryptedPassword]);
    return result.lastID;
  } catch (error) {
    console.error('Error adding password:', error);
    console.error('SQL:', sql);
    console.error('Parameters:', [userId, description, encryptedPassword]);
    throw error;
  }
}

async function updatePassword(id, userId, description, encryptedPassword) {
  const sql = 'UPDATE passwords SET description = ?, encrypted_password = ? WHERE id = ? AND user_id = ?';
  await runQuery(sql, [description, encryptedPassword, id, userId]);
}

async function deletePassword(id, userId) {
  const sql = 'DELETE FROM passwords WHERE id = ? AND user_id = ?';
  await runQuery(sql, [id, userId]);
}