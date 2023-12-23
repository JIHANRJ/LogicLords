const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 2000;

app.use(cors());
app.use(bodyParser.json());

const students = [
  { email: 'subramanyap@student.com', password: '1234', attendance: 0 },
  { email: 'jihanrj@student.com', password: '1234', attendance: 0 },
  { email: 'Vignesh@student.com', password: '1234', attendance: 0 },
  { email: 'Sudhanvabs@student.com', password: '1234', attendance: 0 },
];

app.post('/schd', (req, res) => {
  const { email, password } = req.body;

  const studentIndex = students.findIndex(s => s.email === email && s.password === password);

  if (studentIndex !== -1) {
    // Update attendance in the database
    students[studentIndex].attendance += 1;
    localStorage.setItem('username', 'JohnDoe');
    console.log('username')

    res.json({ success: true, attendance: students[studentIndex].attendance });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
