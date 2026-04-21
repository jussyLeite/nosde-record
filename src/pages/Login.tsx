import { useState } from "react";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Entrar</h2>
        <p>Bem-vindo de volta 👋</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>

        <div className="extra-links">
          <a href="#">Esqueceu a senha?</a>
          <p>
            Não tem conta? <a href="#">Criar conta</a>
          </p>
        </div>
      </div>
    </div>
  );
}

