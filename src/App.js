import React, { useState, useEffect } from 'react';
import './App.css';
import cancion from './cancion.mp3';

function App() {
  const [fireworks, setFireworks] = useState([]);

  useEffect(() => {
    const audio = new Audio(cancion);
    audio.play();
  }, []);

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
      </header>
    </div>
  );
}

export default App;
