// src/features/dashboard/components/MainContent.tsx
import styles from "./MainContent.module.css";

//import "./navbar.css";
import "../../../styles/Hero.css";
import { useEffect, useState } from "react";
import disk from "../../../assets/images/disk.jpg";
import artist2  from "../../../assets/images/music2.jpeg"
import Footer from "./footer";
import ArtistsSection from "../../../components/ArtistsSection";
import MusicCard from "../../../components/MusicCard";
import MusicSection from "../../../components/MusicSection";
import DemoForm from "./DemoForm";

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

interface MainContentProps {
  onNavigateToLogin: () => void;
}

interface MediaItem {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  isExplicit?: boolean;
}

export default function MainContent({ onNavigateToLogin }: MainContentProps) {


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
  

  const popularSongs: MediaItem[] = [
    { id: 1, title: "Coringa", subtitle: "Preto Show, Kelson Most Wanted...", imageUrl: disk, isExplicit: true },
    { id: 2, title: "Dai Dai", subtitle: "Shakira, Burna Boy", imageUrl: artist2 },
    { id: 3, title: "Vai Acontecer", subtitle: "Tshunami, Nilo", imageUrl: artist2, isExplicit: true },
    { id: 4, title: "MO808 #01", subtitle: "Black Vision, AyCi, Cys B...", imageUrl: disk, isExplicit: true },
    { id: 5, title: "Precisas Partir", subtitle: "Edmázia Mayembe", imageUrl: disk },
  ];

  const popularArtists: MediaItem[] = [
    { id: 1, title: "3 Finer", subtitle: "Artista", imageUrl: "https://via.placeholder.com/150" },
    { id: 2, title: "Chelsea Dinorath", subtitle: "Artista", imageUrl: "https://via.placeholder.com/150" },
    { id: 3, title: "Landrick", subtitle: "Artista", imageUrl: "https://via.placeholder.com/150" },
    { id: 4, title: "Mano Chaba", subtitle: "Artista", imageUrl: "https://via.placeholder.com/150" },
    { id: 5, title: "Black Spygo", subtitle: "Artista", imageUrl: "https://via.placeholder.com/150" },
  ];

  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.navArrows}>
          <button className={styles.arrowBtn}>❮</button>
          <button className={styles.arrowBtn}>❯</button>
        </div>
        
        <div className={styles.navLinks}>
          <button className={styles.textLink}>Sobre</button>
          <button className={styles.textLink}>Artistas</button>
          <button className={styles.textLink}>Noticias</button>
          <button className={styles.textLink}>Transferir</button>
          <div className={styles.divider}></div>
          {/* Alterado para Iniciar Sessão conforme solicitado */}
          <button onClick={onNavigateToLogin} className={styles.logoutBtn}>
            Iniciar sessão
          </button>
        </div>
      </header>

       <div
      className="hero premium"
      style={{
        backgroundImage: `url(${slides[current].image})`
      }}
    >

      {/*<ArtistsSection /> */ }
      { /*<MusicSection />*/}
      {/* <DemoForm /> */ }

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

     <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle} onClick={onNavigateToLogin}>Novos Artistas</h2>
          <span className={styles.seeAll} onClick={onNavigateToLogin}>Mostrar tudo</span>
        </div>
        <div className={styles.grid}>
          {popularSongs.map((song) => (
            <div key={song.id} className={styles.card} onClick={onNavigateToLogin}>
              <img src={song.imageUrl} alt={song.title} className={styles.mediaImg} />
              <h3 className={styles.cardTitle}>{song.title}</h3>
              <p className={styles.cardSubtitle}>
                {song.isExplicit && <span className={styles.explicitBadge}>E</span>}
                {song.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>


      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle} onClick={onNavigateToLogin}>Músicas populares</h2>
          <span className={styles.seeAll} onClick={onNavigateToLogin}>Mostrar tudo</span>
        </div>
        <div className={styles.grid}>
          {popularSongs.map((song) => (
            <div key={song.id} className={styles.card} onClick={onNavigateToLogin}>
              <img src={song.imageUrl} alt={song.title} className={styles.mediaImg} />
              <h3 className={styles.cardTitle}>{song.title}</h3>
              <p className={styles.cardSubtitle}>
                {song.isExplicit && <span className={styles.explicitBadge}>E</span>}
                {song.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle} onClick={onNavigateToLogin}>Artistas populares</h2>
          <span className={styles.seeAll} onClick={onNavigateToLogin}>Mostrar tudo</span>
        </div>
        <div className={styles.grid}>
          {popularArtists.map((artist) => (
            <div key={artist.id} className={styles.card} onClick={onNavigateToLogin}>
              <img src={artist.imageUrl} alt={artist.title} className={styles.mediaImgRound} />
              <h3 className={styles.cardTitle}>{artist.title}</h3>
              <p className={styles.cardSubtitle}>{artist.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

     
     <section>
         <DemoForm />
     </section>

    {/* <Footer onRequiredAuth={onNavigateToLogin} />*/}
    </div>
  );
}