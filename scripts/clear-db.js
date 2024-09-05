const sqlite3 = require('sqlite3').verbose();

// Replace with your actual database file path
const DB_PATH = './secure_clipboard.sqlite';

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to the database.');

  // Get all table names
  db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tables) => {
    if (err) {
      console.error('Error fetching tables:', err.message);
      return;
    }

    // Delete data from each table
    tables.forEach(table => {
      if (table.name !== 'sqlite_sequence') {
        db.run(`DELETE FROM ${table.name}`, [], function(err) {
          if (err) {
            console.error(`Error clearing table ${table.name}:`, err.message);
          } else {
            console.log(`Cleared table ${table.name}`);
          }
        });
      }
    });

    // Reset auto-increment counters
    db.run("DELETE FROM sqlite_sequence", [], function(err) {
      if (err) {
        console.error('Error resetting auto-increment:', err.message);
      } else {
        console.log('Reset auto-increment counters');
      }
    });

    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed.');
      }
    });
  });
});