// src/services/giphyService.js
import axios from 'axios';

const API_KEY = 'g23zfB1bmBF6s8XvTVqjSmEJOH9EIkmE'; // Replace with your Giphy API key
const BASE_URL = 'https://api.giphy.com/v1/gifs';

export const fetchTrendingGifs = (offset = 0, limit = 20) => {
  return axios.get(`${BASE_URL}/trending`, {
    params: {
      api_key: API_KEY,
      limit,
      offset,
    },
  });
};

export const searchGifs = (query, offset = 0, limit = 20) => {
  return axios.get(`${BASE_URL}/search`, {
    params: {
      api_key: API_KEY,
      q: query,
      limit,
      offset,
    },
  });
};
