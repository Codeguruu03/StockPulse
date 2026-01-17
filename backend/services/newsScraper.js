// backend/services/newsScraper.js
const axios = require('axios');
const API_TOKEN = process.env.MARKETAUX_API_TOKEN;

async function fetchNews() {
  const url = `https://api.marketaux.com/v1/news/all?countries=in&filter_entities=true&limit=20&published_after=2024-12-31&api_token=${API_TOKEN}`;
  const res = await axios.get(url);
  const articles = res.data.data || [];
  return articles.map(a => ({
    title: a.title,
    url: a.url
  }));
}

module.exports = { fetchNews };
