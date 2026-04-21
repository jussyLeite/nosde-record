// Navbar.tsx
import "./navbar.css";
import logoImage from  "../assets/images/logo2.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <img width={150} height={60} src={logoImage} alt="logoNosdeRecord" />
      <div className="nav-links">
        <a href="#">Início</a>
        <a href="#music" >Músicas</a>
        <a href="#">Artistas</a>
        <a href="#">Notícias</a>
      </div>
      <div>
           <button className="btn btn-secondary">Submeter Demo</button>
          
      </div>
     
    </div>
  );
}