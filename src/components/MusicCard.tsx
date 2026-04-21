import "./navbar.css";
interface Props {
  name: string;
  image: string;
}

export default function MusicCard({ name, image }: Props) {
  return (
    <div className="card">
      <img src={image} />
      <div className="card-body">
        <h4>{name}</h4>
      </div>
    </div>
  );
}