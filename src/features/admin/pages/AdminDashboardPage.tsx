import MusicPlayer from "../../../components/MusicPlayer/MusicPlayer";
import { useAuth } from "../../../context/AuthContext";
import { getAdminDashboardStatistics } from "../../../services/admin.dashboard";
import { getLatestSongs } from "../../../services/song.service";
import type { AdminDashboardStatistics } from "../../../types/AdminDashboard";
import type { Song } from "../../../types/Song";
import SongTable from "../../Artist/component/SongTable";
import styles from "../styles/AdminDashboard.module.css";
import { useEffect, useState } from "react";



// ======================================================
// COMPONENTE
// ======================================================

export default function AdminDashboard() {

  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const { user } = auth;

  const userName = user?.name || "Administrador";

  const [statistics, setStatistics] =
  useState<AdminDashboardStatistics | null>(null);

  const [loading, setLoading] =
  useState(true);

  const [error, setError] =
  useState<string | null>(null);

  const [songs, setSongs] =
        useState<Song[]>([]);

  useEffect(() => {

  async function loadDashboard() {

    try {

      setLoading(true);

      const data =
        await getAdminDashboardStatistics();

      setStatistics(data);

    } catch (error: any) {

      setError(
        error?.response?.data?.message ||
        "Erro ao carregar o dashboard."
      );

    } finally {
      setLoading(false);
    }
  }

  loadDashboard();
}, []);


const loadLatestSongs = async () => {
  
      try {
        setLoading(true);
        setError(null);
  
        const data = await getLatestSongs();
  
        console.log("DataSongs: ",data);
        const sortedSongs = [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        setSongs(sortedSongs);  
      } catch (error) {
  
        console.error(
          "Erro ao carregar músicas:",
          error
        );
  
        setError(
          "Não foi possível carregar as músicas."
        );
  
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      loadLatestSongs();
    }, []);


  // ====================================================
  // RENDER
  // ====================================================

  return (

    <div className={styles.dashboard}>

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
          ESTATÍSTICAS PRINCIPAIS
      ================================================= */}

      <section className={styles.statsGrid}>

        {/* UTILIZADORES */}

        <div className={styles.statCard}>

          <div className={styles.statIcon}>
            <i
              className="fa fa-users"
              aria-hidden="true"
            />
          </div>

          <div className={styles.statContent}>

            <span className={styles.statLabel}>
              Utilizadores
            </span>

            <strong className={styles.statValue}>
              {statistics?.users.toLocaleString() ?? 0}
            </strong>

          </div>

        </div>


        {/* ARTISTAS */}

        <div className={styles.statCard}>

          <div className={styles.statIcon}>
            <i
              className="fa fa-microphone"
              aria-hidden="true"
            />
          </div>

          <div className={styles.statContent}>

            <span className={styles.statLabel}>
              Artistas
            </span>

            <strong className={styles.statValue}>
              {statistics?.artists.toLocaleString() ?? 0}
            </strong>

          </div>

        </div>


        {/* MÚSICAS */}

        <div className={styles.statCard}>

          <div className={styles.statIcon}>
            <i
              className="fa fa-music"
              aria-hidden="true"
            />
          </div>

          <div className={styles.statContent}>

            <span className={styles.statLabel}>
              Músicas
            </span>

            <strong className={styles.statValue}>
              {statistics?.songs.toLocaleString() ?? 0}
            </strong>

          </div>

        </div>


        {/* SUBMISSÕES */}

        <div className={styles.statCard}>

          <div className={styles.statIcon}>
            <i
              className="fa fa-upload"
              aria-hidden="true"
            />
          </div>

          <div className={styles.statContent}>

            <span className={styles.statLabel}>
              Submissões pendentes
            </span>

            <strong className={styles.statValue}>
              {statistics?.submissions.toLocaleString() ?? 0}
            </strong>

          </div>

        </div>

      </section>


      {/* =================================================
          SEGUNDA LINHA
      ================================================= */}

      <section className={styles.overviewGrid}>


        {/* =================================================
            ATIVIDADE DA PLATAFORMA
        ================================================= */}

        <div className={styles.panel}>

          <div className={styles.panelHeader}>

            <div>

              <h2 className={styles.panelTitle}>
                Atividade da plataforma
              </h2>

              <p className={styles.panelSubtitle}>
                Desempenho geral do catálogo.
              </p>

            </div>

          </div>


          <div className={styles.activityList}>

            {/* STREAMS */}

            <div className={styles.activityItem}>

              <div className={styles.activityIcon}>
                <i
                  className="fa fa-headphones"
                  aria-hidden="true"
                />
              </div>

              <div className={styles.activityInfo}>

                <span>
                  Streams
                </span>

                <strong>
                  {statistics?.streams.toLocaleString() ?? 0}
                </strong>

              </div>

            </div>


            {/* DOWNLOADS */}

            <div className={styles.activityItem}>

              <div className={styles.activityIcon}>
                <i
                  className="fa fa-download"
                  aria-hidden="true"
                />
              </div>

              <div className={styles.activityInfo}>

                <span>
                  Downloads
                </span>

                <strong>
                  {statistics?.downloads.toLocaleString() ?? 0}
                </strong>

              </div>

            </div>


            {/* LIKES */}

            <div className={styles.activityItem}>

              <div className={styles.activityIcon}>
                <i
                  className="fa fa-heart"
                  aria-hidden="true"
                />
              </div>

              <div className={styles.activityInfo}>

                <span>
                  Likes
                </span>

                <strong>
                  {0}
                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            SUBMISSÕES
        ================================================= */}

        <div className={styles.panel}>

          <div className={styles.panelHeader}>

            <div>

              <h2 className={styles.panelTitle}>
                Submissões pendentes
              </h2>

              <p className={styles.panelSubtitle}>
                Conteúdos que precisam de análise.
              </p>

            </div>

            <i
              className="fa fa-upload"
              aria-hidden="true"
            />

          </div>


          <div className={styles.pendingContent}>

            <div className={styles.pendingNumber}>
              {0}
            </div>

            <p>
              submissões aguardam revisão.
            </p>


            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => {
                window.location.href =
                  "/admin/submissions";
              }}
            >
              Ver submissões
            </button>

          </div>

        </div>

      </section>


      {/* =================================================
          CONTEÚDO RECENTE
      ================================================= */}

      <section className={styles.recentSection}>

        <div className={styles.panelHeader}>

          <div>

            <h2 className={styles.panelTitle}>
              Conteúdo recente
            </h2>

            <p className={styles.panelSubtitle}>
              Últimas músicas adicionadas à plataforma.
            </p>
            
          </div>

        </div>


        {/* =================================================
            ESTADO VAZIO
        ================================================= */}

        <div className={styles.emptyState}>

          <div className={styles.emptyIcon}>

            <i
              className="fa fa-music"
              aria-hidden="true"
            />

          </div>


        
             {songs.length === 0 ? (
              
                 <h3> Nenhum conteúdo recente</h3>
                      ) : (
                          <div>
                              <MusicPlayer />
                               <SongTable
                                songs={songs}
                                />
                          </div>
                      )}

           {songs.length === 0 ? 
           (<p>
            As músicas adicionadas à plataforma
            aparecerão aqui.
            </p>) 
            : ""}           

        </div>

      </section>

    </div>

  );
}