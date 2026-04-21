// Hero.tsx
import "./navbar.css";
export default function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <h1>DESCUBRA A MELHOR MÚSICA</h1>
        <p>Baixe e ouça músicas. Descubra novos talentos.</p>
        <div className="hero-buttons">
          <button className="btn btn-primary">Baixar Músicas</button>
          <button className="btn btn-outline">Novos Artistas</button>
          <button className="btn btn-secondary">Contacto</button>
        </div>
      </div>
    </div>
  );
}