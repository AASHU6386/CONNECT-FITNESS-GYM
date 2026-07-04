const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const teamMembers = [
  { name: 'Anant', role: 'Head Trainer', cert: 'NASM Certified' },
  { name: 'Chootu', role: 'Yoga & Pilates', cert: 'RYT 500' },
  { name: 'Dr. Aashu', role: 'Nutrition Expert', cert: 'Sports Nutritionist' },
  { name: 'Hello', role: 'Group Fitness', cert: 'ACE Certified' }
];

app.get('/api/team', (_req, res) => {
  res.json(teamMembers);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Please fill in all required fields.' });
  }

  res.json({ msg: 'Thank you! Your message has been received. We will contact you shortly.' });
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ msg: 'Please enter a valid email address.' });
  }

  res.json({ msg: 'Thanks for subscribing! Weekly fitness tips are on the way.' });
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'hello.html'));
});

app.get('/products.html', (_req, res) => {
  res.sendFile(path.join(__dirname, 'products.html'));
});

app.get('*', (req, res) => {
  if (path.extname(req.path)) {
    return res.status(404).send('Not found');
  }
  res.sendFile(path.join(__dirname, 'hello.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
