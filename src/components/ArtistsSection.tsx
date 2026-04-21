import MusicCard from "./MusicCard";
import "./navbar.css";
import artist1 from "../assets/images/music1.jpeg";

export default function ArtistsSection() {
  const artists = [
    { name: "King D Boss", image: artist1 }
  ];

  return (
    <div className="container">
      <h2 className="section-title">Novos Artistas</h2>
      <div className="grid grid-4">
        {artists.map((a, i) => (
          <MusicCard key={i} {...a} />
        ))}
      </div>
    </div>
  );
}
