const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

async function updateSchema() {
  try {
    const db = await open({
      filename: path.join(__dirname, '..', 'secure_clipboard.sqlite'),
      driver: sqlite3.Database
    });

    // Start a transaction
    await db.run('BEGIN TRANSACTION');

    // Drop existing tables
    await db.run('DROP TABLE IF EXISTS passwords');
    await db.run('DROP TABLE IF EXISTS refresh_tokens');
    await db.run('DROP TABLE IF EXISTS users');

    // Create users table
    await db.run(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create passwords table
    await db.run(`
      CREATE TABLE passwords (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        encrypted_description TEXT NOT NULL,
        description_iv TEXT NOT NULL,
        description_auth_tag TEXT NOT NULL,
        encrypted_password_data TEXT NOT NULL,
        password_iv TEXT NOT NULL,
        password_auth_tag TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Create refresh_tokens table
    await db.run(`
      CREATE TABLE refresh_tokens (
        user_id INTEGER PRIMARY KEY,
        token TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Commit the transaction
    await db.run('COMMIT');

    console.log('Database schema updated successfully');

    // Log the schema
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");
    for (const table of tables) {
      const columns = await db.all(`PRAGMA table_info(${table.name})`);
      console.log(`Table: ${table.name}`);
      console.log('Columns:', columns);
    }

    await db.close();
  } catch (error) {
    console.error('Error updating database schema:', error);
    // If there's an error, rollback the transaction
    await db.run('ROLLBACK');
    await db.close();
  }
}

updateSchema();