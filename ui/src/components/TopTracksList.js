import React from 'react';

const TopTracksList = ({ tracks, artist }) => {
  return (
    <div className='topTracksDiv'>
      <h2 className='topTracksDiv__header'>{artist}'s Top Tracks</h2>
      <ul className='topTracksDiv__list'>
        {tracks.map((track) => (
          <li key={track.id}>
            <img src={track.album.images[0]?.url} alt={track.name} width="50" />
            <p><strong>{track.name}</strong></p>
            <audio controls>
              <source src={track.preview_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopTracksList;