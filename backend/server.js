const express = require('express');
const path = require('path');           
const dotenv = require('dotenv');

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '.env') }); 
console.log("Loaded DEEPSEEK_API_KEY:", process.env.DEEPSEEK_API_KEY);

const newsRoute = require('./routes/news');
const portfolioRoute = require('./routes/portfolio');

const app = express();
app.use(express.json());

app.use('/api/news', newsRoute);
app.use('/api/portfolio', portfolioRoute);

app.get('/', (req, res) => {
  res.send('✅ Stock GPT API is running! Use /api/news');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));