const OpenAI = require('openai').default;
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

// Initialize OpenAI with DeepSeek base URL
const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY, // Load from .env
  baseURL: 'https://api.deepseek.com'
});

async function test() {
  try {
    const res = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: `You are a financial AI. Given these stock market headlines, respond ONLY in JSON array format like this:

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
"Tesla shares surge after earnings beat expectations"
"Apple faces supply chain disruptions due to weather"
"Gold prices remain steady amid global uncertainty"`
        }
      ]
    });

    console.log('✅ JSON Output:\n', res.choices[0].message.content);
  } catch (error) {
    console.error('❌ Error occurred:', error);
  }
}

test();
