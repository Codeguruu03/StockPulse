const express = require('express');
const router = express.Router();

// In-memory mock; replace with real API calls to broker
let mockPortfolio = ['RELIANCE', 'TCS', 'INFY'];

router.get('/', (req, res) => {
  res.json({ portfolio: mockPortfolio });
});

router.post('/', (req, res) => {
  const { symbols } = req.body;
  if (Array.isArray(symbols)) {
    mockPortfolio = symbols;
    return res.json({ portfolio: mockPortfolio });
  }
  res.status(400).json({ error: 'Symbols array required' });
});

module.exports = router;
