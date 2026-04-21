// Hero.tsx
import "./navbar.css";
import "../styles/Hero.css";
import { useEffect, useState } from "react";
import disk from "../assets/images/disk.jpg";
import artist2  from "../assets/images/music2.jpeg"

const images = [
  disk,
  artist2,
  artist2
];

const slides = [
  { image: disk, name: "Lil Musa" },
  { image: artist2, name: "Cage Cpt" },
  { image: artist2, name: "King D Boss" }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="hero premium"
      style={{
        backgroundImage: `url(${slides[current].image})`
      }}
    >
      <div className="overlay" />

      <div className="container hero-content">
        <h1>DESCUBRA A MELHOR MÚSICA</h1>
        <p>Baixe e ouça músicas. Descubra novos talentos.</p>

        <div className="hero-buttons">
          <button className="btn btn-primary">Baixar Músicas</button>
          <button className="btn btn-outline">Novos Artistas</button>
          <button className="btn btn-secondary">Contacto</button>
        </div>

        {/* Artist Highlight */}
        <div className="artist-highlight">
          <span>Em destaque:</span>
          <h3>{slides[current].name}</h3>
        </div>

        {/* Controls */}
        <div className="controls">
          <button onClick={prevSlide}>❮</button>
          <button onClick={nextSlide}>❯</button>
        </div>

        {/* Dots */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={index === current ? "dot active" : "dot"}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </div>

    
  );

  
}
    
      



