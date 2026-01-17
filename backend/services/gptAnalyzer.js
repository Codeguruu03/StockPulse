// backend/services/gptAnalyzer.js
const OpenAI = require('openai').default;

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

async function analyzeWithGPT(headlines) {
  const prompt = `You are a financial AI. Given these stock market headlines, respond ONLY in JSON array format like this:

[
  {
    "title": "...",
    "rating": "Positive" | "Neutral" | "Negative",
    "reason": "...",
    "confidence": 0-100
  },
  ...
]

Here are the headlines:
${headlines.map((h, i) => `${i + 1}. ${h.title}`).join('\n')}
`;

  const completion = await openai.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: 'You are a market analyst.' },
      { role: 'user', content: prompt }
    ]
  });

  try {
    const content = completion.choices[0].message.content;
    return JSON.parse(content);
  } catch (err) {
    console.error("❌ Failed to parse DeepSeek response:");
    console.error(completion.choices[0].message.content);
    throw err;
  }
}

module.exports = { analyzeWithGPT };
