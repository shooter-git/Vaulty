const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

async function initDb() {
  try {
    const db = await open({
      filename: path.join(process.cwd(), 'secure_clipboard.sqlite'),
      driver: sqlite3.Database
    });

    // Enable foreign keys
    await db.run('PRAGMA foreign_keys = ON');

    // Create users table
    await db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create passwords table
    await db.run(`
      CREATE TABLE IF NOT EXISTS passwords (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        description TEXT NOT NULL,
        encrypted_password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Check if encrypted_password column exists, if not, add it
    const tableInfo = await db.all("PRAGMA table_info(passwords)");
    if (!tableInfo.some(column => column.name === 'encrypted_password')) {
      await db.run("ALTER TABLE passwords ADD COLUMN encrypted_password TEXT NOT NULL DEFAULT ''");
      console.log("Added encrypted_password column to passwords table");
    }

    console.log('Database initialized successfully');

    // Log the schema
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");
    for (const table of tables) {
      const columns = await db.all(`PRAGMA table_info(${table.name})`);
      console.log(`Table: ${table.name}`);
      console.log('Columns:', columns);
    }

    await db.close();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initDb();