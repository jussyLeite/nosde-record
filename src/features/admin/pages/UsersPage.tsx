// src/features/dashboard/pages/UsersPage.tsx
import React, { useState, useEffect } from "react";
import { getAllUsersApi, type User } from "../../../services/user.service";
import styles from "../styles/UsersPage.module.css";

export default function UsersPage() {

  const ITEMS_PER_PAGE = 6; // Define quantos utilizadores aparecem por página

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const data = await getAllUsersApi();
        setUsers(data);
      } catch (err) {
        setError("Não foi possível carregar a lista de utilizadores.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // Lógica de cálculo da paginação
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading) return <div className={styles.loading}>A carregar utilizadores...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
   <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Utilizadores</h1>
          <p className={styles.subtitle}>Gerencie os utilizadores registados na plataforma.</p>
        </div>
        <span className={styles.countBadge}>{users.length} utilizadores</span>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <span>#</span>
          <span>Nome / E-mail</span>
          <span>Papel (Role)</span>
          <span>Data de Registo</span>
        </div>

        <div className={styles.tableBody}>
          {currentUsers.map((user, index) => (
            <div key={user.id} className={styles.tableRow}>
              <span>{startIndex + index + 1}</span>
              <div className={styles.userInfoCell}>
                <strong>{user.name || "Sem Nome"}</strong>
                <span>{user.email}</span>
              </div>
              <div>
                <span className={`${styles.roleBadge} ${styles[user.role?.toLowerCase() || 'user']}`}>
                  {user.role}
                </span>
              </div>
              <span className={styles.dateCell}>
                {new Date(user.createdAt).toLocaleDateString("pt-PT")}
              </span>
            </div>
          ))}

          {users.length === 0 && (
            <div className={styles.emptyState}>Nenhum utilizador encontrado.</div>
          )}
        </div>

        {/* Rodapé da Tabela com Paginação */}
        <div className={styles.tableFooter}>
          <span className={styles.footerInfo}>
            A mostrar <strong>{users.length > 0 ? startIndex + 1 : 0}</strong> a{" "}
            <strong>{Math.min(startIndex + ITEMS_PER_PAGE, users.length)}</strong> de{" "}
            <strong>{users.length}</strong> utilizadores
          </span>

          <div className={styles.paginationControls}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={styles.pageButton}
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
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}