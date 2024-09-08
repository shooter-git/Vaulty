import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { runQuery, getQuery } from './db';

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export async function createUser(username, password) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await runQuery('BEGIN TRANSACTION');

    const checkUserSQL = 'SELECT id FROM users WHERE username = ?';
    const existingUser = await getQuery(checkUserSQL, [username]);
    
    if (existingUser && existingUser.length > 0) {
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
  if (!username || !password) {
    console.error('Username or password is missing');
    return null;
  }

  try {
    const getUserSQL = 'SELECT * FROM users WHERE username = ?';
    const users = await getQuery(getUserSQL, [username]);
    
    if (users && users.length > 0) {
      const user = users[0];
      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      if (passwordMatch) {
        return user;
      }
    }
    return null;
  } catch (error) {
    console.error('Error verifying user:', error);
    throw error;
  }
}

export function generateTokens(userId) {
  try {
    const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refreshToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error generating tokens:', error);
    throw error;
  }
}

export function verifyToken(token) {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export async function refreshAccessToken(refreshToken) {
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const { accessToken } = generateTokens(decoded.userId);
    return accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
}

export async function storeRefreshToken(userId, refreshToken) {
  try {
    const sql = 'INSERT OR REPLACE INTO refresh_tokens (user_id, token) VALUES (?, ?)';
    await runQuery(sql, [userId, refreshToken]);
  } catch (error) {
    console.error('Error storing refresh token:', error);
    throw error;
  }
}

export async function revokeRefreshToken(userId) {
  try {
    const sql = 'DELETE FROM refresh_tokens WHERE user_id = ?';
    await runQuery(sql, [userId]);
  } catch (error) {
    console.error('Error revoking refresh token:', error);
    throw error;
  }
}

export async function validateRefreshToken(userId, refreshToken) {
  try {
    const sql = 'SELECT token FROM refresh_tokens WHERE user_id = ?';
    const result = await getQuery(sql, [userId]);
    if (result && result.length > 0) {
      return result[0].token === refreshToken;
    }
    return false;
  } catch (error) {
    console.error('Error validating refresh token:', error);
    return false;
  }
}