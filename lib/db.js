import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'

let db = null;

export async function openDb() {
  if (db) return db;
  
  db = await open({
    filename: path.join(process.cwd(), 'secure_clipboard.sqlite'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS passwords (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.exec(`
    ALTER TABLE passwords ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id)
  `);

  return db;
}

export async function getPasswords(userId) {
  const db = await openDb();
  return db.all('SELECT id, description, created_at, updated_at FROM passwords WHERE user_id = ?', userId);
}

export async function getPassword(id, userId) {
  const db = await openDb();
  return db.get('SELECT * FROM passwords WHERE id = ? AND user_id = ?', id, userId);
}

export async function addPassword(userId, description, password) {
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO passwords (user_id, description, password) VALUES (?, ?, ?)',
    userId, description, password
  );
  return result.lastID;
}

export async function updatePassword(id, userId, description, password) {
  const db = await openDb();
  await db.run(
    'UPDATE passwords SET description = ?, password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
    description, password, id, userId
  );
}

export async function deletePassword(id, userId) {
  const db = await openDb();
  await db.run('DELETE FROM passwords WHERE id = ? AND user_id = ?', id, userId);
}