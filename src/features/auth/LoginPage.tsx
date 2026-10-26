// src/features/auth/LoginPage.tsx
import React, { useState } from "react";
import styles from "./Login.module.css";
import nosdelogo  from "../../assets/images/logo2.png";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { log } from "firebase/firestore/pipelines";

export default function LoginPage() {

  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const {
    user,
  } = auth;
  
  
  const handleNavigateToDashboard = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      setIsLoading(true);
      setErrorMessage(null); // Limpa erros anteriores antes de tentar novamente

           console.log(
        "Tentando iniciar sessão..."
      );


      try {
        // 3. Chamar a função de login global ligada ao Axios e Node.js
       const loggedUser = await login({ 
          email: email, 
          password: password 
        });

        
        clearField();
       switch (loggedUser.role) {
        case "ADMIN":
          navigate("/admin/dashboard", { replace: true });
          break;

        case "ARTIST":
          navigate("/artist/dashboard", { replace: true });
          break;

        default:
          // Rota padrão para perfis genéricos ou não mapeados
          navigate("/dashboard", { replace: true });
          break;
      }

      } catch (error: any) {
       
        // Trata mensagens vindas do backend ou erros de conexão
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
           console.error("Erro no login:", error.response.data.message);
        } else {
          setErrorMessage("E-mail ou palavra-passe incorretos. Tente novamente.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };


  function clearField()
  {
    setEmail("");
    setPassword("");
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleNavigateToDashboard} >
        ✕ Voltar ao site
      </button>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>
            <img src={nosdelogo} alt="logo_nosde" width={90} height={90} className={styles.mediaImg} />
          </span>
        </div>
      </header>

      <main className={styles.card}>
        <h1 className={styles.title}>Iniciar sessão</h1>

        {/* 4. Caixa de feedback visual para o utilizador caso ocorra um erro */}
        {errorMessage && (
          <div className={styles.errorBanner}>
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">E-mail ou nome de utilizador</label>
            <input
              id="email"
              type="text"
              placeholder="E-mail ou nome de utilizador"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Palavra-passe</label>
            <input
              id="password"
              type="password"
              placeholder="Palavra-passe"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <button type={styles.submitBtn as any} 
           disabled={isLoading}
          className={styles.submitBtn}>
            {isLoading
              ? "A iniciar sessão..."
              : "Iniciar sessão"
            }
          </button>
        </form>

        <hr className={styles.divider} />

        <p className={styles.footerText}>
          Não tens uma conta? <span className={styles.link}>Regista-te no Spotify.</span>
        </p>
      </main>
    </div>
  );
}