import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

import nosdeLogo from "../../../assets/images/logo2.png";

import styles from "../styles/ArtistSidebar.module.css";



// ======================================================
// TIPOS
// ======================================================

interface MenuItem {
  label: string;
  icon: string;
  path: string;
  badge?: number;
}


// ======================================================
// COMPONENTE
// ======================================================

export default function ArtistSidebar() {

  const auth = useAuth();
  const navigate = useNavigate();

  // O AuthProvider deve envolver esta área
  if (!auth) {
    return null;
  }

  const {
    user,
    logout,
  } = auth;


  // ====================================================
  // MENU PRINCIPAL
  // ====================================================

  const menuItems: MenuItem[] = [

    {
      label: "Dashboard",
      icon: "fa-home",
      path: "/artist/dashboard",
    },

    {
      label: "Meu perfil",
      icon: "fa-user",
      path: "/artist/profile",
    },

    {
      label: "Minhas músicas",
      icon: "fa-music",
      path: "/artist/music",
    },

    {
      label: "Upload de música",
      icon: "fa-upload",
      path: "/artist/musicupload",
    },

    {
      label: "Estatísticas",
      icon: "fa-bar-chart",
      path: "/artist/statistics",
    },

    {
      label: "Likes",
      icon: "fa-heart",
      path: "/artist/likes",
    },

    {
      label: "Downloads",
      icon: "fa-download",
      path: "/artist/downloads",
    },

    {
      label: "Notificações",
      icon: "fa-bell",
      path: "/artist/notifications",
      badge: 3,
    },

  ];


  // ====================================================
  // LOGOUT
  // ====================================================

  const handleLogout = () => {

    logout();

    navigate(
      "/login",
      {
        replace: true,
      }
    );

  };


  // ====================================================
  // NOME DO ARTISTA
  // ====================================================

  const userName =
    user?.name || "Artista";


  const avatarLetter =
    userName
      .charAt(0)
      .toUpperCase();


  // ====================================================
  // RENDER
  // ====================================================

  return (

    <aside className={styles.sidebar}>


      {/* =================================================
          LOGO
      ================================================= */}

      <div className={styles.logoArea}>

        <img
          src={nosdeLogo}
          alt="NOSDE RECORD"
          className={styles.logo}
        />

        <span className={styles.logoText}>
          NOSDE RECORD
        </span>

      </div>


      {/* =================================================
          PERFIL
      ================================================= */}

      <div className={styles.profileCard}>

        <div className={styles.avatar}>
          {avatarLetter}
        </div>

        <div className={styles.profileInfo}>

          <span className={styles.profileName}>
            {userName}
          </span>

          <span className={styles.profileRole}>
            Artista
          </span>

        </div>

      </div>


      {/* =================================================
          MENU
      ================================================= */}

      <nav className={styles.navigation}>

        <span className={styles.sectionTitle}>
          Gestão
        </span>


        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.menuItem} ${
                isActive
                  ? styles.menuItemActive
                  : ""
              }`
            }
          >

            <span className={styles.menuIcon}>

              <i
                className={`fa ${item.icon}`}
                aria-hidden="true"
              />

            </span>


            <span className={styles.menuLabel}>
              {item.label}
            </span>


            {item.badge !== undefined && (

              <span className={styles.badge}>
                {item.badge}
              </span>

            )}

          </NavLink>

        ))}

      </nav>


      {/* =================================================
          ESPAÇADOR
      ================================================= */}

      <div className={styles.spacer} />


      {/* =================================================
          MENU INFERIOR
      ================================================= */}

      <div className={styles.bottomSection}>

        <div className={styles.divider} />


        <NavLink
          to="/artist/settings"
          className={({ isActive }) =>
            `${styles.menuItem} ${
              isActive
                ? styles.menuItemActive
                : ""
            }`
          }
        >

          <span className={styles.menuIcon}>

            <i
              className="fa fa-cog"
              aria-hidden="true"
            />

          </span>

          <span className={styles.menuLabel}>
            Definições
          </span>

        </NavLink>


        {/* =================================================
            TERMINAR SESSÃO
        ================================================= */}

        <button
          type="button"
          className={`${styles.menuItem} ${styles.logoutButton}`}
          onClick={handleLogout}
        >

          <span className={styles.menuIcon}>

            <i
              className="fa fa-sign-out"
              aria-hidden="true"
            />

          </span>

          <span className={styles.menuLabel}>
            Terminar sessão
          </span>

        </button>

      </div>

    </aside>

  );
}