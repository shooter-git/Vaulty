import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { runQuery, getQuery } from './db';

export async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await runQuery('BEGIN TRANSACTION');

    const checkUserSQL = 'SELECT id FROM users WHERE username = ?';
    const existingUser = await getQuery(checkUserSQL, [username]);
    
    if (existingUser) {
      await runQuery('ROLLBACK');
      throw new Error('Username already exists');
    }

    const insertUserSQL = 'INSERT INTO users (username, password_hash) VALUES (?, ?)';
    const result = await runQuery(insertUserSQL, [username, hashedPassword]);

    await runQuery('COMMIT');
    return result.lastID;
  } catch (error) {
    await runQuery('ROLLBACK');
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function verifyUser(username, password) {
  try {
    const getUserSQL = 'SELECT * FROM users WHERE username = ?';
    const user = await getQuery(getUserSQL, [username]);
    if (user && await bcrypt.compare(password, user.password_hash)) {
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error verifying user:', error);
    throw error;
  }
}

export function generateToken(userId) {
  try {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}