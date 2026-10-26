import { useEffect, useMemo, useState } from "react";
import { deleteSong, getAllSongs } from "../../../services/song.service";
import type { Song } from "../../../types/Song";
import { useAuth } from "../../../context/AuthContext";
import styles from "../styles/AdminCatalog.module.css";
import SongAdminTable from "../component/SongAdminTable";
import type { CreateSongData } from "../../../types/CreateSongData";
import UploadAdminSongDialog from "../component/UploadAdminSongDialog";

type SortOption =
  | "latest"
  | "oldest"
  | "name-asc"
  | "name-desc"
  | "streams"
  | "downloads";

export default function SubmissionsPage() {
  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const { user } = auth;

  const userName = user?.name || "Administrador";


  const [uploading, setUploading] =
    useState(false);

  const [isUploadOpen, setIsUploadOpen] =
    useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [seletedSong, setseletedSong] = useState<Song | null>(null);

  // ============================================================
  // FILTROS
  // ============================================================

  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  // ============================================================
  // CARREGAR MÚSICAS
  // ============================================================

  const loadSongs = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAllSongs();

      const sortedSongs = [...data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

      setSongs(sortedSongs);
    } catch (error) {
      console.error("Erro ao carregar músicas:", error);

      setError("Não foi possível carregar as músicas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSongs();
  }, []);

  // ============================================================
  // GÉNEROS DISPONÍVEIS
  // ============================================================

  const genres = useMemo(() => {
    const uniqueGenres = songs
      .map((song) => song.genre)
      .filter(Boolean);

    return Array.from(new Set(uniqueGenres)).sort();
  }, [songs]);

  // ============================================================
  // FILTRAR E ORDENAR
  // ============================================================

  const filteredSongs = useMemo(() => {
    let result = [...songs];

    // ----------------------------------------------------------
    // PESQUISA
    // ----------------------------------------------------------

    const searchValue = search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter((song) => {
        const songName = song.title?.toLowerCase() || "";

        /*
         * Ajusta esta parte caso no teu Song o artista
         * tenha outro nome de propriedade.
         */
        const artistName = song.artist?.stageName
           || "";

        return (
          songName.includes(searchValue) ||
          artistName.includes(searchValue)
        );
      });
    }

    // ----------------------------------------------------------
    // GÉNERO
    // ----------------------------------------------------------

    if (genreFilter !== "all") {
      result = result.filter(
        (song) => song.genre === genreFilter
      );
    }

    // ----------------------------------------------------------
    // ESTADO
    // ----------------------------------------------------------

    if (statusFilter !== "all") {
      result = result.filter((song) => {
        /*
         * Caso o teu Song tenha um campo status,
         * será utilizado aqui.
         */
        return song.status === statusFilter;
      });
    }

    // ----------------------------------------------------------
    // ORDENAÇÃO
    // ----------------------------------------------------------

    result.sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );

        case "oldest":
          return (
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
          );

        case "name-asc":
          return a.title.localeCompare(b.title);

        case "name-desc":
          return b.title.localeCompare(a.title);

        case "streams":
          return (b.streams || 0) - (a.streams || 0);

        case "downloads":
          return (b.downloads || 0) - (a.downloads || 0);

        default:
          return 0;
      }
    });

    return result;
  }, [
    songs,
    search,
    genreFilter,
    statusFilter,
    sortBy,
  ]);

  // ============================================================
  // LIMPAR FILTROS
  // ============================================================

  const clearFilters = () => {
    setSearch("");
    setGenreFilter("all");
    setStatusFilter("all");
    setSortBy("latest");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    genreFilter !== "all" ||
    statusFilter !== "all" ||
    sortBy !== "latest";

  // ============================================================
  // RENDER
  // ============================================================

  const handleDelete = async (song: Song) => {
  const confirmed = window.confirm(
    `Tem certeza que deseja remover "${song.title}"?`
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteSong(song.id);

    setSongs((currentSongs) =>
      currentSongs.filter(
        (item) => item.id !== song.id
      )
    );
  } catch (error) {
    console.error(
      "Erro ao remover música:",
      error
    );

    setError(
      "Não foi possível remover a música."
    );
  }
};

 const handleUpload = async (
    data: CreateSongData
  ) => {

    try {

      setUploading(true);

      console.log("seletedSong on handleUpload");
      console.log(seletedSong);

      setError(null);

      setIsUploadOpen(false);

    } catch (error) {

      throw error;

    } finally {

      setUploading(false);
    }
  };

const handleEdit = (song: Song) => {

    setIsUploadOpen(true)
    setseletedSong(song);

    console.log("song Info");
    console.log(song);
        
};

  return (
    <div className={styles.catalog}>
      {/* ========================================================
          HEADER
      ======================================================== */}

      <header className={styles.pageHeader}>
        <div>
          <h1>Submissões</h1>

          <p>
            Gerencie as músicas disponíveis na plataforma.
          </p>
        </div>

        <div className={styles.adminGreeting}>
          Olá, {userName}
        </div>
      </header>

      {/* ========================================================
          ERROR
      ======================================================== */}

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {/* ========================================================
          CARD
      ======================================================== */}

      <section className={styles.catalogCard}>
        {/* ======================================================
            CARD HEADER
        ====================================================== */}

        <div className={styles.cardHeader}>
          <div>
            <h2>Músicas submetidas</h2>

            <span>
              {filteredSongs.length}{" "}
              {filteredSongs.length === 1
                ? "música"
                : "músicas"}
            </span>
          </div>
        </div>

        {/* ======================================================
            FILTROS
        ====================================================== */}

        <div className={styles.filters}>
          {/* PESQUISA */}

          <div className={styles.searchBox}>
            <i
              className="fa fa-search"
              aria-hidden="true"
            />

            <input
              type="text"
              placeholder="Pesquisar por música ou artista..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          {/* GÉNERO */}

          <div className={styles.filterGroup}>
            <label>Género</label>

            <select
              value={genreFilter}
              onChange={(e) =>
                setGenreFilter(e.target.value)
              }
            >
              <option value="all">
                Todos os géneros
              </option>

              {genres.map((genre) => (
                <option
                  key={genre}
                  value={genre}
                >
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* ESTADO */}

          <div className={styles.filterGroup}>
            <label>Estado</label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="all">
                Todos os estados
              </option>

              <option value="PUBLISHED">
                Publicadas
              </option>

              <option value="PENDING">
                Pendentes
              </option>

              <option value="DRAFT">
                Rascunhos
              </option>
            </select>
          </div>

          {/* ORDENAÇÃO */}

          <div className={styles.filterGroup}>
            <label>Ordenar por</label>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as SortOption
                )
              }
            >
              <option value="latest">
                Mais recentes
              </option>

              <option value="oldest">
                Mais antigas
              </option>

              <option value="name-asc">
                Nome: A–Z
              </option>

              <option value="name-desc">
                Nome: Z–A
              </option>

              <option value="streams">
                Mais streams
              </option>

              <option value="downloads">
                Mais downloads
              </option>
            </select>
          </div>

          {/* LIMPAR */}

          {hasActiveFilters && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={clearFilters}
            >
              <i
                className="fa fa-times"
                aria-hidden="true"
              />

              Limpar
            </button>
          )}
        </div>

        {/* ======================================================
            LOADING
        ====================================================== */}

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />

            <span>
              A carregar músicas...
            </span>
          </div>
        ) : filteredSongs.length === 0 ? (
          /* ====================================================
             EMPTY
          ==================================================== */

          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <i
                className="fa fa-music"
                aria-hidden="true"
              />
            </div>

            <h3>
              {songs.length === 0
                ? "Ainda não existem músicas"
                : "Nenhuma música encontrada"}
            </h3>

            <p>
              {songs.length === 0
                ? "As músicas adicionadas à plataforma aparecerão aqui."
                : "Tente alterar os filtros ou a pesquisa."}
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className={styles.emptyButton}
              >
                Limpar filtros
              </button>
            )}
          </div>
        ) : (
          /* ====================================================
             TABLE
          ==================================================== */

          <div className={styles.tableWrapper}>
            <SongAdminTable
                songs={filteredSongs}
                onEdit={handleEdit}
                onDelete={handleDelete}
                />
          </div>
        )}

         <UploadAdminSongDialog
                open={isUploadOpen}
                loading={uploading}
                song={seletedSong}
                onClose={() =>
                  setIsUploadOpen(false)
                }
               onUpload={handleUpload}
              />
      </section>
    </div>
  );
}