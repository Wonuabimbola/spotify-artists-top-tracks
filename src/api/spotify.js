import axios from "axios";

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

export const getAccessToken = async () => {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`,
      },
    }
  );
  console.log("access token: " + response.data.access_token);
  return response.data.access_token;
};

export const searchArtist = async (token, query) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data.artists.items[0]);
  return response.data.artists.items[0];
};


export const getArtistTopTracks = async (token, artistId, country = 'US') => {
    const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${country}`;
    console.log('Fetching URL:', url); // Debugging line
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.tracks;
  };
