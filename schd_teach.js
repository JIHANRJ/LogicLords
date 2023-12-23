const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database('/Users/rakesh/Desktop/ENIGMA/schd.db');

app.use(express.json());

// Express route to get all schedules from SQLite
app.get('/schd', (req, res) => {
  db.all('SELECT * FROM schd_class2', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Express route to add a schedule to the SQLite database
app.post('/schd', (req, res) => {
  const { T_name, Sec, Subject, Date_Class, Timings, Link } = req.body;

  // Add the schedule to the database
  const stmt = db.prepare('INSERT INTO schd_class2 (T_name, Sec, Subject, Date_Class, Timings, Link) VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run(T_name, Sec, Subject, Date_Class, Timings, Link, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Schedule added successfully' });
    }
  });
});

// Define a route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the schedule application!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
