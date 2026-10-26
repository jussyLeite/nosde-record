import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import nosdeLogo from "../../../assets/images/logo2.png";
import styles from "../styles/AdminSidebar.module.css";

// ======================================================
// TIPOS
// ======================================================

interface MenuItem {
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

interface MenuSection {
  title?: string;
  items: MenuItem[];
}

// ======================================================
// COMPONENTE
// ======================================================

export default function AdminSidebar() {

  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth) {
    return null;
  }

  const {
    user,
    logout,
  } = auth;

  // ====================================================
  // MENU ADMINISTRATIVO
  // ====================================================

  const menuSections: MenuSection[] = [

    // ==============================
    // VISÃO GERAL
    // ==============================

    {
      items: [
        {
          label: "Dashboard",
          icon: "fa-tachometer",
          path: "/admin/dashboard",
        },
      ],
    },


    // ==============================
    // CONTEÚDO
    // ==============================

    {
      title: "Conteúdo",
      items: [
        {
          label: "Catálogo",
          icon: "fa-music",
          path: "/admin/catalog",
        },

        {
          label: "Artistas",
          icon: "fa-microphone",
          path: "/admin/artists",
        },

        {
          label: "Submissões",
          icon: "fa-upload",
          path: "/admin/submission",
        },

        {
          label: "Playlists",
          icon: "fa-list",
          path: "/admin/playlists",
        },
      ],
    },

    // ==============================
    // UTILIZADORES
    // ==============================

    {
      title: "Utilizadores",
      items: [
        {
          label: "Utilizadores",
          icon: "fa-users",
          path: "/admin/users",
        },
      ],
    },

    // ==============================
    // MODERAÇÃO
    // ==============================

    {
      title: "Moderação",
      items: [
        {
          label: "Moderação",
          icon: "fa-shield",
          path: "/admin/moderation",
        },

        {
          label: "Denúncias",
          icon: "fa-flag",
          path: "/admin/reports",
        },
      ],
    },


    // ==============================
    // ANÁLISES
    // ==============================

    {
      title: "Análises",
      items: [
        {
          label: "Estatísticas",
          icon: "fa-bar-chart",
          path: "/admin/analytics",
        },
      ],
    },


    // ==============================
    // FINANCEIRO
    // ==============================

    {
      title: "Financeiro",
      items: [
        {
          label: "Financeiro",
          icon: "fa-money",
          path: "/admin/financial",
        },
      ],
    },


    // ==============================
    // SISTEMA
    // ==============================

    {
      title: "Sistema",
      items: [
        {
          label: "Notificações",
          icon: "fa-bell",
          path: "/admin/notifications",
          badge: 3,
        },

        {
          label: "Configurações",
          icon: "fa-cog",
          path: "/admin/settings",
        },
      ],
    },

  ];


  // ====================================================
  // LOGOUT
  // ====================================================

  const handleLogout = () => {

    logout();

    navigate("/login", {
      replace: true,
    });

  };


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
          MENU
      ================================================= */}

      <nav className={styles.navigation}>

        {menuSections.map((section, sectionIndex) => (

          <div
            key={section.title ?? `section-${sectionIndex}`}
            className={styles.menuSection}
          >

            {/* TÍTULO DA SECÇÃO */}

            {section.title && (

              <span className={styles.sectionTitle}>
                {section.title}
              </span>

            )}


            {/* ITENS */}

            {section.items.map((item) => (

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

          </div>

        ))}

      </nav>


      {/* =================================================
          ESPAÇADOR
      ================================================= */}

      <div className={styles.spacer} />


      {/* =================================================
          PARTE INFERIOR
      ================================================= */}

      <div className={styles.bottomSection}>

        <div className={styles.divider} />


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