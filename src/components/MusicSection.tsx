import MusicCard from "./MusicCard";
import "./navbar.css";
import disk from "../assets/images/disk.jpg";
import artist2  from "../assets/images/music2.jpeg"

export default function MusicSection() {
  const musics = [
    { name: "Lil Musa", image: disk },
    { name: "Cage Cpt", image: artist2 }
  ];

  return (
    <div className="container">
      <h2 className="section-title">Músicas Populares</h2>
      <div className="grid grid-4">
        {musics.map((m, i) => (
          <MusicCard key={i} {...m} />
        ))}
      </div>
    </div>
  );
}