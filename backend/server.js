const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5001;

// Enable CORS for frontend-backend communication
app.use(cors());

// Endpoint to get Spotify Access Token
app.get('/api/token', async (req, res) => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString('base64')}`,
        },
      }
    );
    res.json({ accessToken: response.data.access_token });
  } catch (error) {
    console.error('Error fetching access token:', error.message);
    res.status(500).json({ error: 'Failed to get access token' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
