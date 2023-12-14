// SongTransposer.jsx

import React, { useState } from 'react';

const SongTransposer = () => {
  const [originalKey, setOriginalKey] = useState('C');
  const [newKey, setNewKey] = useState('C');
  const [song, setSong] = useState('');
  const [transposedSong, setTransposedSong] = useState('');

  const handleTranspose = () => {
    // Lógica para llamar a la función de transposición
    // (puedes usar el objeto Transposer aquí)
    // Actualizar el estado de transposedSong con el resultado
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Song Transposer</h1>
      <div className="mb-4">
        <label className="block mb-2">Original Key:</label>
        <input
          type="text"
          value={originalKey}
          onChange={(e) => setOriginalKey(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">New Key:</label>
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <textarea
          rows={10}
          cols={50}
          placeholder="Enter your song lyrics with chords here..."
          value={song}
          onChange={(e) => setSong(e.target.value)}
          className="border p-2 w-full"
        ></textarea>
      </div>
      <button
        onClick={handleTranspose}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Transpose
      </button>
      {transposedSong && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Transposed Song:</h2>
          <pre className="bg-gray-200 p-4 rounded">{transposedSong}</pre>
        </div>
      )}
    </div>
  );
};

export default SongTransposer;
