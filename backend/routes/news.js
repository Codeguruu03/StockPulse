const express = require('express');
const router = express.Router();
const { fetchNews } = require('../services/newsScraper');
const { analyzeWithGPT } = require('../services/gptAnalyzer');

router.get('/', async (req, res) => {
  try {
    const headlines = await fetchNews();
    res.json({ headlines });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

router.post('/analyze', async (req, res) => {
  try {
    const { filtered } = req.body;
    const result = await analyzeWithGPT(filtered);
    res.json({ analysis: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DeepSeek GPT analysis failed' });
  }
});

module.exports = router;
