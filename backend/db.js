import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./expenses.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      amount INTEGER,
      date TEXT
    )
  `);
});

export default db;
