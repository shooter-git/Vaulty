const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

async function updateSchema() {
  try {
    const db = await open({
      filename: path.join(process.cwd(), 'secure_clipboard.sqlite'),
      driver: sqlite3.Database
    });

    // Start a transaction
    await db.run('BEGIN TRANSACTION');

    // Drop the existing passwords table
    await db.run('DROP TABLE IF EXISTS passwords');

    // Create the passwords table with the correct schema for AES-256-GCM
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

    // Commit the transaction
    await db.run('COMMIT');

    console.log('Database schema updated successfully');

    await db.close();
  } catch (error) {
    console.error('Error updating database schema:', error);
    // If there's an error, rollback the transaction
    await db.run('ROLLBACK');
    await db.close();
  }
}

updateSchema();