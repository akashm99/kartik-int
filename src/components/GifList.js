// src/components/GifList.js
import React from 'react';

function GifList({ gifs }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {gifs.map((gif) => (
        <div key={gif.id} className="border p-2">
          <img
            src={gif.images.fixed_height.url}
            alt={gif.title}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default GifList;
