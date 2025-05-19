const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite DB
const dbPath = path.resolve(__dirname, 'expenses.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create expenses table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount INTEGER NOT NULL,
    date TEXT NOT NULL
  )`,
  (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  }
);

// GET all expenses
app.get('/api/expenses', (req, res) => {
  const sql = 'SELECT * FROM expenses ORDER BY date DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching expenses:', err.message);
      res.status(500).json({ error: 'Failed to fetch expenses' });
    } else {
      res.json(rows);
    }
  });
});

// POST new expense
app.post('/api/expenses', (req, res) => {
  const { title, amount, date } = req.body;
  if (!title || !amount || !date) {
    return res.status(400).json({ error: 'Please provide title, amount, and date' });
  }
  
  const sql = 'INSERT INTO expenses (title, amount, date) VALUES (?, ?, ?)';
  db.run(sql, [title, amount, date], function (err) {
    if (err) {
      console.error('Error inserting expense:', err.message);
      res.status(500).json({ error: 'Error adding expense' });
    } else {
      // Return the inserted expense with the new ID
      res.json({ id: this.lastID, title, amount, date });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
