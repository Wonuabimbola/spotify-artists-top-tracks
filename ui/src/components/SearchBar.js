import React, { useState } from "react";
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
    setQuery('');
  };

  return (
    <div className="searchArea">
      <div className="searchArea__inputArea">
        <input
          className="searchArea__input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an artist to see their top tracks"
          onKeyDown={e => e.key === 'Enter'? handleSearch() : null}
        />
      </div>
      <div className="searchArea__button">
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
