let sqlite3;
let open;
let path;

if (typeof window === 'undefined') {
  sqlite3 = require('sqlite3');
  open = require('sqlite').open;
  path = require('path');
}

let db = null;

export async function openDb() {
  if (typeof window !== 'undefined') {
    throw new Error('Database operations are not supported on the client-side');
  }

  if (db) return db;
  
  try {
    db = await open({
      filename: path.join(process.cwd(), 'secure_clipboard.sqlite'),
      driver: sqlite3.Database
    });

    // Enable foreign keys
    await db.run('PRAGMA foreign_keys = ON');

    console.log('Database opened successfully');

    // Wrap the run method to add logging
    const originalRun = db.run;
    db.run = function(sql, params, callback) {
      console.log('Executing SQL:', sql);
      console.log('Parameters:', params);
      return originalRun.call(this, sql, params, callback);
    };

    return db;
  } catch (error) {
    console.error('Error opening database:', error);
    throw error;
  }
}

export async function closeDb() {
  if (typeof window !== 'undefined') {
    throw new Error('Database operations are not supported on the client-side');
  }

  if (db) {
    await db.close();
    db = null;
    console.log('Database closed');
  }
}

export async function runQuery(sql, params = []) {
  if (typeof window !== 'undefined') {
    throw new Error('Database operations are not supported on the client-side');
  }

  const db = await openDb();
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
  if (typeof window !== 'undefined') {
    throw new Error('Database operations are not supported on the client-side');
  }

  const db = await openDb();
  try {
    console.log('Executing SQL:', sql);
    console.log('Parameters:', params);
    const result = await db.get(sql, params);
    return result;
  } catch (error) {
    console.error('Error executing query:', sql);
    console.error('Error details:', error);
    throw error;
  }
}