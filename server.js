const express = require('express');
const cors = require('cors');

const app = express();

// Allow only your Netlify frontend
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'https://varsha-portfolio.netlify.app';

app.use(express.json());

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ['GET', 'POST'],
  })
);

// Health check
app.get('/', (req, res) => {
  res.json({ activeStatus: true, error: false });
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All fields required' });
    }

    console.log('New contact message:', { name, email, subject, message });

    // TODO: store in DB or send email if you want

    return res.json({ success: true });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = app;
