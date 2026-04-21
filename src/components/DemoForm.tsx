import "./navbar.css";
export default function DemoForm() {
  return (
    <div className="demo">
      <div className="container">
        <h2>Enviar a sua demo</h2>
        <form>
          <input placeholder="Nome artístico" />
          <input placeholder="Email" />
          <input type="file" />
          <textarea placeholder="Mensagem"></textarea>
          <button className="btn btn-primary">Enviar</button>
        </form>
      </div>
    </div>
  );
}