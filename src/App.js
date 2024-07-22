import React, { useState, useRef } from 'react';
import './App.css';
import cancion from './cancion.mp3';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';

function App() {
  const [fireworks, setFireworks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleClick = (e) => {
    const newFirework = {
      id: Date.now(),
      top: e.clientY,
      left: e.clientX,
    };
    setFireworks((prevFireworks) => [...prevFireworks, newFirework]);

    // Remove the firework after some time
    setTimeout(() => {
      setFireworks((prevFireworks) =>
        prevFireworks.filter((fw) => fw.id !== newFirework.id)
      );
    }, 2000);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10; // Rewind by 10 seconds
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10; // Forward by 10 seconds
    }
  };

  const hearts = Array.from({ length: 10 }, (_, i) => <div key={i} className="heart"></div>);

  return (
    <div className="App" onClick={handleClick}>
      {hearts}
      {fireworks.map((fw) => (
        <div
          key={fw.id}
          className="firework"
          style={{ top: fw.top, left: fw.left }}
        ></div>
      ))}
      <header className="App-header">
        <p className="custom-message bounce">
          ¡Feliz cumpleaños!
        </p>
        <div className="player-controls">
          <button onClick={handleRewind} className="control-button">
            <FaStepBackward />
          </button>
          <button onClick={handlePlayPause} className="control-button">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={handleForward} className="control-button">
            <FaStepForward />
          </button>
        </div>
        <audio ref={audioRef} src={cancion} />
      </header>
    </div>
  );
}

export default App;
