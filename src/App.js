// This is an interview setting,
// Task: build a fully functional react web application for image upload service
// functionalities:
// upload image
// query and display all images
// provide me with complete code with comments for all files, components, etc with filename for each on top
// you may use express, mongodb, context apis if required, tailwind css

// give me overview and list of components & apis with short short description 

// mongodb+srv://akashbm08:TxLpv8EmjMhrmnK0@cluster0.kzpfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// src/App.js
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchTrendingGifs, searchGifs } from './services/giphyService';
import GifList from './components/GifList';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [gifs, setGifs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    loadTrendingGifs();
  }, []);

  const loadTrendingGifs = async () => {
    const response = await fetchTrendingGifs(offset);
    setGifs(response.data.data);
    setOffset(offset + 20);
  };

  const loadMoreGifs = async () => {
    try {
      let response;
  
      if (searchQuery) {
        response = await searchGifs(searchQuery, offset);
      } else {
        response = await fetchTrendingGifs(offset);
      }
  
      setGifs((prevGifs) => [...prevGifs, ...response.data.data]);
      setOffset(offset + 20);
      setHasMore(response.data.data.length > 0);
    } catch (error) {
      console.error("Error fetching more GIFs:", error);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setOffset(0);
    const response = await searchGifs(query);
    setGifs(response.data.data);
  };

  const handleClear = () => {
    setSearchQuery('');
    setOffset(0);
    loadTrendingGifs();
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} onClear={handleClear} />
      <InfiniteScroll
        dataLength={gifs.length}
        next={loadMoreGifs}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more GIFs to load</p>}
      >
        <GifList gifs={gifs} />
      </InfiniteScroll>
    </div>
  );
}

export default App;
