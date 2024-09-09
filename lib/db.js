import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

let dbInstance = null;

export async function getDb() {
  if (dbInstance) {
    return dbInstance;
  }

  // Determine the data directory
  const dataDir = process.env.DB_DATA_DIR || path.join(process.cwd(), 'data');
  
  // Ensure the data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, 'secure_clipboard.sqlite');

  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Enable foreign keys
  await dbInstance.run('PRAGMA foreign_keys = ON');

  console.log(`New database connection opened at ${dbPath}`);
  return dbInstance;
}

export async function runQuery(sql, params = []) {
  const db = await getDb();
  try {
    console.log('Executing SQL:', sql);
    console.log('Parameters:', params);
    const result = await db.run(sql, params);
    return result;
  } catch (error) {
    console.error('Error executing query:', sql);
    console.error('Error details:', error);
    throw error;
  }
}

export async function getQuery(sql, params = []) {
  const db = await getDb();
  try {
    console.log('Executing SQL:', sql);
    console.log('Parameters:', params);
    const result = await db.all(sql, params);
    return result;
  } catch (error) {
    console.error('Error executing query:', sql);
    console.error('Error details:', error);
    throw error;
  }
}

// This function is no longer needed, but we'll keep it for backwards compatibility
export async function openDb() {
  return getDb();
}

// This function is no longer needed, but we'll keep it for backwards compatibility
export async function closeDb() {
  console.log('closeDb called, but connection will be kept open');
}