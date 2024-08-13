// src/components/SearchBar.js
import React from 'react';

function SearchBar({ onSearch, onClear }) {
  const handleChange = (event) => {
    if (event.target.value === '') {
      onClear();
    } else {
      onSearch(event.target.value);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search GIFs..."
      onChange={handleChange}
      className="w-full p-2 border rounded"
    />
  );
}

export default SearchBar;
