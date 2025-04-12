// api/share.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const googleSheetUrl = `https://script.google.com/macros/s/AKfycbx0xL77IWSYsrcHfo8N3uh-5DbtTd5_jFpXs36Mj6zLt8ejiqB_q0iNlOCD6y7mLB0/exec?id=${id}`;

  try {
    const response = await fetch(googleSheetUrl);
    const data = await response.json();
    
    if (data.id) {
      res.status(200).json({
        altText: data.altText,
        flexJson: data.flexJson
      });
    } else {
      res.status(404).json({ error: 'ID not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
