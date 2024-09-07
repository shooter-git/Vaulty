const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

async function clearDb() {
  let db;
  try {
    db = await open({
      filename: path.join(process.cwd(), 'secure_clipboard.sqlite'),
      driver: sqlite3.Database
    });

    console.log('Connected to the database.');

    // Start a transaction
    await db.run('BEGIN TRANSACTION');

    // Get all table names
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");

    // Clear data from each table
    for (const table of tables) {
      await db.run(`DELETE FROM ${table.name}`);
      console.log(`Cleared table: ${table.name}`);
    }

    // Reset auto-increment counters
    for (const table of tables) {
      await db.run(`DELETE FROM sqlite_sequence WHERE name='${table.name}'`);
      console.log(`Reset auto-increment for table: ${table.name}`);
    }

    // Commit the transaction
    await db.run('COMMIT');

    console.log('Database cleared successfully.');
  } catch (error) {
    console.error('Error clearing database:', error);
    if (db) {
      await db.run('ROLLBACK');
      console.log('Changes rolled back due to error.');
    }
  } finally {
    if (db) {
      await db.close();
      console.log('Database connection closed.');
    }
  }
}

clearDb();