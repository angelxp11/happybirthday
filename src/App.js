import React, { useState, useEffect } from 'react';
import './App.css';
import audioFile from './cancion.mp3';

// Importar todas las imágenes
import img1 from './imagenes/img1.jpg';
import img2 from './imagenes/img2.jpg';
import img3 from './imagenes/img3.jpg';
import img4 from './imagenes/img4.jpg';
import img5 from './imagenes/img5.jpg';
import img6 from './imagenes/img6.jpg';
import img7 from './imagenes/img7.jpg';
import img8 from './imagenes/img8.jpg';
import img9 from './imagenes/img9.jpg';
import img10 from './imagenes/img10.jpg';
import img11 from './imagenes/img11.jpg';
import img12 from './imagenes/img12.jpg';
import img13 from './imagenes/img13.jpg';
import img14 from './imagenes/img14.jpg';
import img15 from './imagenes/img15.jpg';
import img16 from './imagenes/img16.jpg';
import img17 from './imagenes/img17.jpg';
import img18 from './imagenes/img18.jpg';

const allImages = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9,
  img10, img11, img12, img13, img14, img15, img16, img17, img18
];

function App() {
  const [currentImages, setCurrentImages] = useState(Array(9).fill(null));
  const [visible, setVisible] = useState(Array(9).fill(false));
  const [firstImage, setFirstImage] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateImages(true);
      const interval = setInterval(() => {
        updateImages();
      }, 15000); // Intervalo total de 15 segundos

      return () => clearInterval(interval);
    }, 2000); // Esperar 2 segundos antes de mostrar las primeras imágenes

    return () => clearTimeout(timer);
  }, []);

  const updateImages = (initial = false) => {
    const shuffledImages = [...allImages].sort(() => Math.random() - 0.5);
    const newImages = shuffledImages.slice(0, 9);

    if (initial) {
      setCurrentImages(newImages);
      setVisible(Array(9).fill(true));
    } else {
      setVisible(Array(9).fill(false));
      setTimeout(() => {
        setCurrentImages(newImages);
        setVisible(Array(9).fill(true));
        setFirstImage(false);
      }, 5000); // Tiempo de transición antes de mostrar nuevas imágenes
    }
  };
  

  const handleShowMessage = () => {
    setShowMessage(true);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const formatMessage = (message, maxLength = 27) => {
    const words = message.split(' ');
    const lines = [];
    let currentLine = '';
  
    words.forEach(word => {
      // Si la palabra cabe en la línea actual, añádela
      if (currentLine.length + word.length + 1 <= maxLength) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        // Si no cabe, guarda la línea actual y empieza una nueva
        lines.push(currentLine);
        currentLine = word;
      }
    });
  
    // Añadir la última línea si no está vacía
    if (currentLine) {
      lines.push(currentLine);
    }
  
    return lines.join('\n');
  };
  
  const message = "¡Feliz cumpleaños Mami! Hicimos este proyecto Espero que te guste esto, lo hicimos con mucho cariño, que mi dios nos la bendiga hoy mañana y siempre para verle siempre con esa sonrisa tan bella que siempre tiene, gracias por ser nuestra mami y nuestra gran heroina, te amamos mami y te mandamos un gran abrazo a la distancia  y esperamos que tengaun día maravilloso lleno de alegría y sorpresas. 🎉            Att Haisslin, Deanyela y Jose.";
  const formattedMessage = formatMessage(message);
  

  return (
    <div className="App">
      {[...Array(10)].map((_, index) => (
        <div key={index} className={`heart ${index % 2 === 0 ? 'left' : 'right'}`}></div>
      ))}
      <header className="App-header">
        <p className="custom-message">¡Feliz cumpleaños Mami!</p>
      </header>
      <audio className="audio-player" controls autoPlay>
        <source src={audioFile} type="audio/mp3" />
      </audio>
      <div className="image-grid">
        {currentImages.map((img, index) => (
          <div key={index} className="image-wrapper">
            <img
              src={img}
              alt={`img${index}`}
              className={`image-item ${visible[index] ? (firstImage ? 'show-first' : 'show') : 'hide'}`}
            />
          </div>
        ))}
      </div>
      <button className="envelope-button" onClick={handleShowMessage}></button>

      {showMessage && (
        <div className="overlay">
          <div className="message-box">
            <pre className="birthday-message">{formattedMessage}</pre>
            <button className="close-button" onClick={handleCloseMessage}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
