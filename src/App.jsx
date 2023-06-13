import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

function App() {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    audioUrl: "",
    imageUrl: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:1212/api/songs")
      .then((res) => setSongs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong({ ...newSong, [name]: value });
  };

  const addSong = () => {
    axios
      .post("http://localhost:1212/api/songs", newSong)
      .then(() => {
        setSongs([...songs, newSong]);
        console.log("Song added successfully");
        setNewSong({
          title: "",
          artist: "",
          audioUrl: "",
          imageUrl: "",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Spicefy Player</h1>
      <div>
        <h2>Add song</h2>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newSong.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Artist:
          <input
            type="text"
            name="artist"
            value={newSong.artist}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Audio URL:
          <input
            type="text"
            name="audioUrl"
            value={newSong.audioUrl}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={newSong.imageUrl}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={addSong}>Add Song</button>
      </div>
      <hr />
      <div>
        <h2>Songs</h2>
        {songs.map((song) => (
          <div key={song._id}>
            <img src={song.imageUrl} alt={song.title} />
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
            <audio controls src={song.audioUrl}></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
