import { verifyToken } from '../../lib/auth-server';
import { runQuery, getQuery } from '../../lib/db';
import { encrypt, decrypt } from '../../lib/encryption';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const userId = decoded.userId;

  try {
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
        const encryptedDesc = encrypt(description);
        const encryptedPass = encrypt(password);
        const id = await addPassword(userId, encryptedDesc, encryptedPass);
        res.status(201).json({ id, description });
        break;

      case 'PUT':
        const { id: updateId, description: updateDesc, password: updatePass } = req.body;
        if (!updateId || !updateDesc || !updatePass) {
          return res.status(400).json({ message: 'ID, description, and password are required' });
        }
        const encryptedUpdateDesc = encrypt(updateDesc);
        const encryptedUpdatePass = encrypt(updatePass);
        await updatePassword(updateId, userId, encryptedUpdateDesc, encryptedUpdatePass);
        res.status(200).json({ message: 'Password updated successfully' });
        break;

      case 'DELETE':
        const { id: deleteId } = req.body;
        if (!deleteId) {
          return res.status(400).json({ message: 'Password ID is required' });
        }
        await deletePassword(deleteId, userId);
        res.status(200).json({ message: 'Password deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in password operation:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

async function getPasswords(userId) {
  const sql = `
    SELECT id, encrypted_description, description_iv, description_auth_tag, 
           encrypted_password_data, password_iv, password_auth_tag 
    FROM passwords 
    WHERE user_id = ?
  `;
  const passwords = await getQuery(sql, [userId]);
  return passwords.map(pw => ({
    id: pw.id,
    description: decrypt({
      encryptedData: pw.encrypted_description,
      iv: pw.description_iv,
      authTag: pw.description_auth_tag
    }),
    password: decrypt({
      encryptedData: pw.encrypted_password_data,
      iv: pw.password_iv,
      authTag: pw.password_auth_tag
    })
  }));
}

async function addPassword(userId, encryptedDescription, encryptedPassword) {
  const sql = `
    INSERT INTO passwords (
      user_id, 
      encrypted_description, description_iv, description_auth_tag,
      encrypted_password_data, password_iv, password_auth_tag
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const result = await runQuery(sql, [
    userId,
    encryptedDescription.encryptedData,
    encryptedDescription.iv,
    encryptedDescription.authTag,
    encryptedPassword.encryptedData,
    encryptedPassword.iv,
    encryptedPassword.authTag
  ]);
  return result.lastID;
}

async function updatePassword(id, userId, encryptedDescription, encryptedPassword) {
  const sql = `
    UPDATE passwords SET 
      encrypted_description = ?, description_iv = ?, description_auth_tag = ?,
      encrypted_password_data = ?, password_iv = ?, password_auth_tag = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND user_id = ?
  `;
  await runQuery(sql, [
    encryptedDescription.encryptedData,
    encryptedDescription.iv,
    encryptedDescription.authTag,
    encryptedPassword.encryptedData,
    encryptedPassword.iv,
    encryptedPassword.authTag,
    id,
    userId
  ]);
}

async function deletePassword(id, userId) {
  const sql = 'DELETE FROM passwords WHERE id = ? AND user_id = ?';
  await runQuery(sql, [id, userId]);
}