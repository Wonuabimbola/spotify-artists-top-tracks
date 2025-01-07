import axios from "axios";

export const getAccessToken = async () => {
  const response = await axios.get('http://localhost:5001/api/token');
  return response.data.accessToken;
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
  return response.data.artists.items[0];
};


export const getArtistTopTracks = async (token, artistId, country = 'US') => {
    const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${country}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.tracks;
  };
