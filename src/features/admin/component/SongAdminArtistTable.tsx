import { useState, useEffect } from "react";
import type { Song } from "../../../types/Song";
import styles from "../styles/SongAdminArtistTable.module.css";
import type { Artist } from "../../../types/Artist";
import Row from "./SongAdminArtistRow";

interface SongAdminArtistTableProps {
  artists: Artist[];
  loading?: boolean;
  onEdit?: (song: any) => void;
  onDelete?: (song: any) => void;
}

const ITEMS_PER_PAGE = 4; // Ajusta a quantidade de músicas por página aqui

export default function SongAdminArtistTable({ artists, loading = false,
  onEdit,
  onDelete }: SongAdminArtistTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Faz reset para a página 1 caso a lista de músicas mude globalmente (ex: filtros ou pesquisa)
  useEffect(() => {
    setCurrentPage(1);
  }, [artists]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando músicas...</div>
      </div>
    );
  }

  // Cálculos da Paginação
  const totalItems = artists.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  
  // Corta o array para exibir apenas os itens da página atual
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentartists = artists.slice(startIndex, endIndex);

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
            <th>Artista</th>
            <th>Status</th>
            <th>Data criação</th>
            <th>Data Atualização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentartists.length === 0 ? (
            <tr>
              <td colSpan={7} className={styles.empty}>
                Nenhuma artista encontrada.
              </td>
            </tr>
          ) : (
            currentartists.map((artist, index) => (
              <Row key={artist.id} data={artist}
               onEdit={onEdit}
               index={index + 1}
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
