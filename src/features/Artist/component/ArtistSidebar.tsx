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
  role: String;
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
    /*
    * ADMIN MENU ITEM
    *  
    * */
   
  // ==============================
  // VISÃO GERAL
  // ==============================

  {
    label: "Dashboard",
    icon: "fa-tachometer",
    path: "/admin/dashboard",
    role: "ADMIN",
  },

  // ==============================
  // CONTEÚDO
  // ==============================

  {
    label: "Catálogo",
    icon: "fa-music",
    path: "/admin/catalog",
    role: "ADMIN",
  },

  {
    label: "Artistas",
    icon: "fa-microphone",
    path: "/admin/artists",
    role: "ADMIN",
  },

  {
    label: "Submissões",
    icon: "fa-upload",
    path: "/admin/submissions",
    role: "ADMIN",
  },

  {
    label: "Playlists",
    icon: "fa-list",
    path: "/admin/playlists",
    role: "ADMIN",
  },

  // ==============================
  // UTILIZADORES
  // ==============================

  {
    label: "Utilizadores",
    icon: "fa-users",
    path: "/admin/users",
    role: "ADMIN",
  },

  // ==============================
  // MODERAÇÃO
  // ==============================

  {
    label: "Moderação",
    icon: "fa-shield",
    path: "/admin/moderation",
    role: "ADMIN",
  },

  {
    label: "Denúncias",
    icon: "fa-flag",
    path: "/admin/reports",
    role: "ADMIN",
  },

  // ==============================
  // ESTATÍSTICAS
  // ==============================

  {
    label: "Estatísticas",
    icon: "fa-bar-chart",
    path: "/admin/analytics",
    role: "ADMIN",
  },

  // ==============================
  // FINANCEIRO
  // ==============================

  {
    label: "Financeiro",
    icon: "fa-money",
    path: "/admin/financial",
    role: "ADMIN",
  },

  // ==============================
  // SISTEMA
  // ==============================

  {
    label: "Notificações",
    icon: "fa-bell",
    path: "/admin/notifications",
    role: "ADMIN",
  },

  {
    label: "Configurações",
    icon: "fa-cog",
    path: "/admin/settings",
    role: "ADMIN",
  },


   /* { 
      label: "Dashboard", 
      icon: "fa-tachometer", 
      path: "/admin/dashboard", 
      role: "ADMIN" 
    },

    { 
      label: "Gestão do Catálogo", 
      icon: "fa-music", 
      path: "/admin/catalog", 
      role: "ADMIN" 
    },

    { 
      label: "Artistas & Perfis", 
      icon: "fa-microphone", 
      path: "/admin/artists", 
      role: "ADMIN" 
    },

    { 
      label: "Utilizadores", 
      icon: "fa-users", 
      path: "/admin/users", 
      role: "ADMIN" 
    },

    { 
      label: "Royalties & Saques", 
      icon: "fa-money", 
      path: "/admin/financial", 
      role: "ADMIN" 
    },

    { 
      label: "Moderação & Denúncias", 
      icon: "fa-shield", 
      path: "/admin/moderation", 
      role: "ADMIN" 
    },

    { 
      label: "Relatórios",
       icon: "fa-bar-chart",
       path: "/admin/analytics", 
       role: "ADMIN" 
    },

    { 
      label: "Configurações", 
      icon: "fa-cog", 
      path: "/admin/settings", 
      role: "ADMIN" 
    },

    {
      label: "Dashboard",
      icon: "fa-home",
      path: "/artist/dashboard",
      role: "ADMIN"
    },    */

    /*
    * ARTIST MENU ITEM
    *  
    * 
    * */
    {
      label: "Meu perfil",
      icon: "fa-user",
      path: "/artist/profile",
      role: "ARTIST"
    },

    {
      label: "Minhas músicas",
      icon: "fa-music",
      path: "/artist/music",
      role: "ARTIST"
    },

    {
      label: "Upload de música",
      icon: "fa-upload",
      path: "/artist/musicupload",
      role: "ARTIST"
    },

    {
      label: "Estatísticas",
      icon: "fa-bar-chart",
      path: "/artist/statistics",
      role: "ARTIST"
    },

    {
      label: "Likes",
      icon: "fa-heart",
      path: "/artist/likes",
      role: "ARTIST"
    },

    {
      label: "Downloads",
      icon: "fa-download",
      path: "/artist/downloads",
      role: "ARTIST"
    },

    {
      label: "Notificações",
      icon: "fa-bell",
      path: "/artist/notifications",
      role: "ARTIST",
      badge: 3,
    },

  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.role) return true; // Se não exigir role específica, exibe para todos
    return item.role === user?.role;
  });


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


        {filteredMenuItems.map((item) => (

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