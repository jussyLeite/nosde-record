import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function DashboardArtist() {

  const {
    user,
    logout,
  } = useAuth();

  const navigate = useNavigate();


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {

    try {

      await logout();

    } finally {

      navigate(
        "/login",
        {
          replace: true,
        }
      );

    }

  };


  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
      }}
    >

      <h1>
        Dashboard do Artista
      </h1>


      <p>
        Bem-vindo à área autenticada.
      </p>


      {/* ==================================== */}
      {/* UTILIZADOR                            */}
      {/* ==================================== */}

      {user && (

        <div>

          <p>
            Utilizador:{" "}
            {user.name ||
              user.email ||
              user.email}
          </p>

          <p>
            E-mail: {user.email}
          </p>

        </div>

      )}


      {/* ==================================== */}
      {/* LOGOUT                                */}
      {/* ==================================== */}

      <button
        onClick={handleLogout}
      >
        Terminar sessão
      </button>

    </div>

  );
}