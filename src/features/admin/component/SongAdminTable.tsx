import { useState, useEffect } from "react";
import type { Song } from "../../../types/Song";
import SongRow from "./SongAdminRow";
import styles from "../styles/SongAdminTable.module.css";
import SongAdminRow from "./SongAdminRow";

interface SongAdminTableProps {
  songs: Song[];
  loading?: boolean;
  onEdit?: (song: Song) => void;
  onDelete?: (song: Song) => void;
}

const ITEMS_PER_PAGE = 4; // Ajusta a quantidade de músicas por página aqui

export default function SongAdminTable({ songs, loading = false,
  onEdit,
  onDelete }: SongAdminTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Faz reset para a página 1 caso a lista de músicas mude globalmente (ex: filtros ou pesquisa)
  useEffect(() => {
    setCurrentPage(1);
  }, [songs]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando músicas...</div>
      </div>
    );
  }

  // Cálculos da Paginação
  const totalItems = songs.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  
  // Corta o array para exibir apenas os itens da página atual
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSongs = songs.slice(startIndex, endIndex);

  // Funções de Navegação
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.playColumn}>#</th>
            <th>Música</th>
            <th>Género</th>
            <th>Status</th>
            <th>Streams</th>
            <th>Downloads</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentSongs.length === 0 ? (
            <tr>
              <td colSpan={7} className={styles.empty}>
                Nenhuma música encontrada.
              </td>
            </tr>
          ) : (
            currentSongs.map((song) => (
              <SongAdminRow key={song.id} song={song}
               onEdit={onEdit}
               onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>

      {/* CONTROLES DE PAGINAÇÃO */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            A mostrar <strong>{startIndex + 1}</strong> a{" "}
            <strong>{Math.min(endIndex, totalItems)}</strong> de{" "}
            <strong>{totalItems}</strong> músicas
          </div>

          <div className={styles.paginationButtons}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={styles.pageButton}
              title="Página Anterior"
            >
              ◀
            </button>
            
            <span className={styles.pageIndicator}>
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
              title="Próxima Página"
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
