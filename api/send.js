// pages/api/send.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const scriptUrl = 'https://script.google.com/macros/s/AKfycbzccmYXxndkmToIFFILe8ax_lhmnuoHiA1wAaZeyqzHaa9YH6LvU_WfEdnJQdCTJKe0/exec';

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    res.status(200).send(text);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
