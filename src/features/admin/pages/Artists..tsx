import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import styles  from "../../admin/styles/AdminArtists.module.css";
import SongAdminTable from "../component/SongAdminTable";
import { getAllArtist, type Artist } from "../../../services/artrist.serivice";
import SongAdminArtistTable from "../component/SongAdminArtistTable";
import ArtistDetailsDialog from "../component/ArtistDetailsDialog";







type SortOption =
  | "latest"
  | "oldest"
  | "name-asc"
  | "name-desc"
  | "streams"
  | "downloads";

export default function Artist() {
  const auth = useAuth();
  
  const { user } = auth;

  if (!auth) {
    return null;
  }

  const userName = user?.name || "Administrador";

  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const [uploading, setUploading] =
    useState(false);

  const [isUploadOpen, setIsUploadOpen] =
    useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  //const [seletedSong, setseletedSong] = useState<Song | null>(null);

  // ============================================================
  // FILTROS
  // ============================================================

  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  


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

  const loadArtists = async () => {

    setLoading(true);
    setError(null);

  try 
  {

    const response = await  getAllArtist();
    console.log(response);

    const artistsArray = response.data || response;

    const sortedArtist = [...artistsArray].sort(
      (a,b) => new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
    );

   setArtists(sortedArtist);
    console.log("Array ordenado de artistas:", sortedArtist);
    console.log("StageName do primeiro:", sortedArtist[0]?.stageName);

  } catch(error) {

    setError("Não foi possível carregar os artistas.");
  } finally {
    setLoading(false);
  }
}

const handleOpenDetails = (artist: Artist) => {
  setSelectedArtist(artist);
  console.log("seleectd",artist);
  setIsDialogOpen(true);
};

 const filteredArtist = useMemo(() => {
    let result = [...artists];

    // ----------------------------------------------------------
    // PESQUISA
    // ----------------------------------------------------------

    const searchValue = search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter((artist) => {
        const songName = artist.stageName?.toLowerCase() || "";
     
        return (
          songName.includes(searchValue) 
        );
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
          return a.stageName.localeCompare(b.stageName);

        case "name-desc":
          return b.stageName.localeCompare(a.stageName);

        default:
          return 0;
      }
    });

    return result;
  }, [
    artists,
    search,
    genreFilter,
    statusFilter,
    sortBy,
  ]);


useEffect(()=> {
  loadArtists();
}, []);
  

  return (
    <div className={styles.catalog}>
      {/* ========================================================
          HEADER
      ======================================================== */}

      <header className={styles.pageHeader}>
        <div>
          <h1>Artistas</h1>

          <p>
            Gerencie os artistas disponíveis na plataforma.
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
            <h2>Artistas</h2>

            <span>
              
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
              placeholder="Pesquisar artista..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          
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
        ) : filteredArtist.length === 0 ? (
         

          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <i
                className="fa fa-music"
                aria-hidden="true"
              />
            </div>

            <h3>
              {artists.length === 0
                ? "Ainda não existem músicas"
                : "Nenhuma música encontrada"}
            </h3>

            <p>
              {artists.length === 0
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
         

          <div className={styles.tableWrapper}>
            <SongAdminArtistTable
                artists={artists}
                onEdit={handleOpenDetails}
                onDelete={()=>{}}
                />
          </div>
        ) }


<ArtistDetailsDialog 
  open={isDialogOpen}
  onClose={() => setIsDialogOpen(false)}
  artist={selectedArtist}
/>
        

      </section>
    </div>
  );
}