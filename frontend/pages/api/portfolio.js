import axios from 'axios';
export default async function handler(req, res) {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
  if (req.method === 'GET') {
    const { data } = await axios.get(`${base}/api/portfolio`);
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const { data } = await axios.post(`${base}/api/portfolio`, req.body);
    res.status(200).json(data);
  } else res.status(405).end();
}
