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

  useEffect(() => {
    // Mostrar imágenes después de 2 segundos
    const timer = setTimeout(() => {
      updateImages(true);
      const interval = setInterval(() => {
        updateImages();
      }, 10000); // Cambiar imágenes cada 10 segundos (5s fadeIn + 5s visible + 5s fadeOut)

      return () => clearInterval(interval);
    }, 2000); // Esperar 2 segundos antes de comenzar la animación

    return () => clearTimeout(timer);
  }, []);

  const updateImages = (initial = false) => {
    // Seleccionar 9 imágenes únicas al azar
    const shuffledImages = [...allImages].sort(() => Math.random() - 0.5);
    const newImages = shuffledImages.slice(0, 9);

    if (initial) {
      setCurrentImages(newImages);
      setVisible(Array(9).fill(true)); // Mostrar nuevas imágenes inmediatamente
    } else {
      setVisible(Array(9).fill(false)); // Ocultar todas las imágenes antes de actualizar
      setTimeout(() => {
        setCurrentImages(newImages);
        setVisible(Array(9).fill(true)); // Mostrar nuevas imágenes después de un breve retraso
        setFirstImage(false); // Desactivar la bandera para la primera imagen
      }, 5000); // Esperar 5 segundos para fadeOut antes de actualizar
    }
  };

  return (
    <div className="App">
      {/* Corazones animados */}
      {[...Array(10)].map((_, index) => (
        <div key={index} className={`heart ${index % 2 === 0 ? 'left' : 'right'}`}></div>
      ))}
      <header className="App-header">
        <p className="custom-message">¡Feliz cumpleaños!</p>
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
      </header>
    </div>
  );
}

export default App;
