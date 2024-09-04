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

  return db;
}

export async function getPasswords() {
  const db = await openDb();
  return db.all('SELECT id, description, created_at, updated_at FROM passwords');
}

export async function getPassword(id) {
  const db = await openDb();
  return db.get('SELECT * FROM passwords WHERE id = ?', id);
}

export async function addPassword(description, password) {
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO passwords (description, password) VALUES (?, ?)',
    description, password
  );
  return result.lastID;
}

export async function updatePassword(id, description, password) {
  const db = await openDb();
  await db.run(
    'UPDATE passwords SET description = ?, password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    description, password, id
  );
}

export async function deletePassword(id) {
  const db = await openDb();
  await db.run('DELETE FROM passwords WHERE id = ?', id);
}