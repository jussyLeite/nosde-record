import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import type { Song } from "../../../types/Song";
import styles from "../styles/ArtistLayout.module.css";
import { getSongs } from "../../../services/song.service";


export default function ArtistDashboard() {

  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const {
    user,
  } = auth;

  
    const [songs, setSongs] =
      useState<Song[]>([]);
  
    const [loading, setLoading] =
      useState(true);
  
    const [error, setError] =
      useState<string | null>(null);
    
    const [totalMusic, setTotalMusic] = useState<Number | null>(null);
    const [download, setDownload] = useState<Number | null>(null);
    const [streams, setStreams] = useState<Number | null>(null);


  const userName =
    user?.name || "Artista";

   const loadSongs = async () => {
  
      try {
        setLoading(true);
        setError(null);
  
        const data = await getSongs();
  
        console.log("DataSongs: ",data);
        const sortedSongs = [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
  
        setSongs(sortedSongs);
        setTotalMusic(sortedSongs.length);
        setDownload(countDownloads());
        setStreams(countStreams());
      
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
  
      loadSongs();

    }, []);

    function countDownloads(): number {
      return songs.reduce((total, song) => {
        // Garante que se o campo downloads não existir ou for inválido, soma 0
        const downloadCount = Number(song.downloads) || 0;
        return total + downloadCount;
      }, 0);
    }

     function countStreams(): number {
      return songs.reduce((total, song) => {
        // Garante que se o campo downloads não existir ou for inválido, soma 0
        const countStreams = Number(song.streams) || 0;
        return total + countStreams;
      }, 0);
    }


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
              { totalMusic?.toString() }
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
              {download?.toString()}
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