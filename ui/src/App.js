import React, { useState, useEffect } from 'react';
import { getAccessToken, searchArtist, getArtistTopTracks } from './api/spotify';
import SearchBar from './components/SearchBar';
import TopTracksList from './components/TopTracksList';

const App = () => {
  const [token, setToken] = useState('');
  const [artistSearched, setArtistSearched] = useState('');
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAccessToken();
      setToken(token);
    };
    fetchToken();
  }, []);

  const handleSearch = async (query) => {
    if (!token) return;

    try {
      const artist = await searchArtist(token, query);
      console.log('Artist:', artist); // Debugging line
      if (artist) {
        setArtistSearched(artist.name);
        const tracks = await getArtistTopTracks(token, artist.id);
        setTopTracks(tracks);
      } else {
        console.error('Artist not found');
      }
    } catch (error) {
      console.error('Error fetching artist top tracks:', error);
    }
  };

  return (
    <div>
      <h1 className='header'>Spotify Artist Top Tracks</h1>
      <SearchBar onSearch={handleSearch} />
      <TopTracksList tracks={topTracks} artist={artistSearched}/>
    </div>
  );
};

export default App;