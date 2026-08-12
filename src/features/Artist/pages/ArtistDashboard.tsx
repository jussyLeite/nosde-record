import { useAuth } from "../../../context/AuthContext";

import styles from "../styles/ArtistLayout.module.css";


export default function ArtistDashboard() {

  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const {
    user,
  } = auth;


  const userName =
    user?.name || "Artista";


  return (

    <div>

      {/* =================================================
          CABEÇALHO
      ================================================= */}

      <header className={styles.pageHeader}>

        <div>

          <h1 className={styles.pageTitle}>
            Dashboard
          </h1>

          <p className={styles.pageSubtitle}>
            Bem-vindo de volta, {userName}.
          </p>

        </div>

      </header>


      {/* =================================================
          CARDS DE ESTATÍSTICAS
      ================================================= */}

      <section className={styles.statsGrid}>

        <div className={styles.statCard}>

          <span className={styles.statIcon}>
            <i
              className="fa fa-music"
              aria-hidden="true"
            />
          </span>

          <div>

            <span className={styles.statLabel}>
              Músicas
            </span>

            <strong className={styles.statValue}>
              0
            </strong>

          </div>

        </div>


        <div className={styles.statCard}>

          <span className={styles.statIcon}>
            <i
              className="fa fa-headphones"
              aria-hidden="true"
            />
          </span>

          <div>

            <span className={styles.statLabel}>
              Streams
            </span>

            <strong className={styles.statValue}>
              0
            </strong>

          </div>

        </div>


        <div className={styles.statCard}>

          <span className={styles.statIcon}>
            <i
              className="fa fa-heart"
              aria-hidden="true"
            />
          </span>

          <div>

            <span className={styles.statLabel}>
              Likes
            </span>

            <strong className={styles.statValue}>
              0
            </strong>

          </div>

        </div>


        <div className={styles.statCard}>

          <span className={styles.statIcon}>
            <i
              className="fa fa-download"
              aria-hidden="true"
            />
          </span>

          <div>

            <span className={styles.statLabel}>
              Downloads
            </span>

            <strong className={styles.statValue}>
              0
            </strong>

          </div>

        </div>

      </section>


      {/* =================================================
          CONTEÚDO
      ================================================= */}

      <section className={styles.dashboardSection}>

        <div className={styles.sectionHeader}>

          <div>

            <h2 className={styles.sectionTitle}>
              Minhas músicas
            </h2>

            <p className={styles.sectionSubtitle}>
              Aqui aparecerão as tuas músicas
              e o respetivo desempenho.
            </p>

          </div>

        </div>


        <div className={styles.emptyState}>

          <span className={styles.emptyIcon}>

            <i
              className="fa fa-music"
              aria-hidden="true"
            />

          </span>


          <h3>
            Ainda não tens músicas
          </h3>


          <p>
            Faz o upload da tua primeira música
            para começar a divulgar o teu trabalho.
          </p>

        </div>

      </section>

    </div>

  );
}