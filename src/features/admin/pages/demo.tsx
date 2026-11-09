import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getAllDemos } from "../../../services/demo.service"; // A função que criámos que retorna DemosApiResponse
import type { Demo, Pagination } from "../../../types/Demo"; // Ajusta o caminho das tuas types

import "../styles/demoPage.css"; // Importa o teu ficheiro CSS dedicado
import SongPlayButton from "../../Artist/component/SongPlayButton";

export default function DemoPage() {
  const auth = useAuth();

  if (!auth) {
    return null;
  }

  const { user } = auth;
  const userName = user?.name || "Administrador";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [demos, setDemos] = useState<Demo[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    loadDemos(currentPage);
  }, [currentPage]);

  const loadDemos = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllDemos(page, limit);

      setDemos(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Erro ao carregar demos:", error);
      setError("Não foi possível carregar as submissões de demos.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (pagination && pagination.hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination && pagination.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "-" : date.toLocaleDateString("pt-PT");
  };

  return (
    <div className="demo-page-container">
      {/* Cabeçalho */}
      <div className="demo-header-section">
        <div>
          <h1 className="demo-main-title">Demos</h1>
          <p className="demo-subtitle">
            Gerencie as músicas submetidas para avaliação na plataforma.
          </p>
        </div>
        <div className="demo-user-greeting">Olá, {userName}</div>
      </div>

      {/* Caixa Principal / Tabela */}
      <div className="demo-card-box">
        <div className="demo-card-header">
          <h2>Músicas submetidas</h2>
          <span className="demo-count-badge">
            {pagination ? `${pagination.totalItems} músicas no total` : "A carregar..."}
          </span>
        </div>

        {error && <div className="demo-error-message">{error}</div>}

        <div className="demo-table-responsive">
          <table className="demo-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Música / Artista</th>
                <th>Email</th>
                <th>Status</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="demo-text-center">
                    A carregar submissões...
                  </td>
                </tr>
              ) : demos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="demo-text-center">
                    Nenhuma demo submetida encontrada.
                  </td>
                </tr>
              ) : (
                demos.map((demo, index) => {
                  const itemNumber = pagination 
                    ? (pagination.page - 1) * pagination.limit + index + 1 
                    : index + 1;

                  return (
                    <tr key={demo.id} className="demo-table-row">
                      <td className="demo-index-cell">{itemNumber}</td>
                      
                      <td className="demo-song-cell">
                        <SongPlayButton audioUrl={demo.audioUrl} />
                        <div className="demo-song-info">
                          <strong className="demo-artist-name">{demo.nomeArtistico}</strong>
                          <span className="demo-song-desc">
                            {demo.mensagem || "Sem mensagem"}
                          </span>
                        </div>
                      </td>

                      <td className="demo-email-cell">{demo.email}</td>

                      <td>
                        <span
                          className={`demo-status-badge ${
                            demo.status === "APPROVED"
                              ? "status-approved"
                              : demo.status === "REJECTED"
                              ? "status-rejected"
                              : "status-pending"
                          }`}
                        >
                          {demo.status}
                        </span>
                      </td>

                      <td className="demo-date-cell">
                        {formatDate(demo.createdAt)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Barra de Paginação Inferior */}
        {pagination && pagination.totalItems > 0 && (
          <div className="demo-pagination-footer">
            <div className="demo-pagination-info">
              A mostrar <strong>{((pagination.page - 1) * pagination.limit) + 1}</strong> a{" "}
              <strong>{Math.min(pagination.page * pagination.limit, pagination.totalItems)}</strong> de{" "}
              <strong>{pagination.totalItems}</strong> músicas
            </div>

            <div className="demo-pagination-buttons">
              <button
                onClick={handlePreviousPage}
                disabled={!pagination.hasPreviousPage || loading}
                className="demo-page-btn"
                title="Página Anterior"
              >
                ◀
              </button>

              <span className="demo-page-indicator">
                Página {pagination.page} de {pagination.totalPages || 1}
              </span>

              <button
                onClick={handleNextPage}
                disabled={!pagination.hasNextPage || loading}
                className="demo-page-btn"
                title="Próxima Página"
              >
                ▶
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}