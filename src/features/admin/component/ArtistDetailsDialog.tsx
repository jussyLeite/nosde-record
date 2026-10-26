// src/features/dashboard/components/ArtistDetailsDialog.tsx
import React, { useState, useEffect } from "react";
import { userService, type UserDetail } from "../../../services/artrist.serivice";
import { type Artist } from "../../../services/artrist.serivice"; // ou o teu tipo de artista
import styles from "../styles/ArtistDetailsDialog.module.css";

interface ArtistDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  artist: Artist | null;
}

export default function ArtistDetailsDialog({
  open,
  onClose,
  artist,
}: ArtistDetailsDialogProps) {
  // 1. TODOS OS HOOKS NO TOPO (Evita o erro de renderização de hooks)
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchUserData() {
      if (!artist?.userId) return;
      
      setLoadingUser(true);
      setErrorUser(null);
      
      try {
        const userData = await userService.getUserById(artist.userId);
        if (isMounted) {
          setUser(userData);
        }
      } catch (err) {
        if (isMounted) {
          setErrorUser("Não foi possível carregar os dados da conta do utilizador.");
        }
      } finally {
        if (isMounted) {
          setLoadingUser(false);
        }
      }
    }

    if (open && artist) {
      fetchUserData();
    } else {
      setUser(null); // Limpa ao fechar
    }

    return () => {
      isMounted = false;
    };
  }, [open, artist]);

  // 2. RETORNO CONDICIONAL APENAS APÓS OS HOOKS
  if (!open || !artist) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.dialogContainer}>
        
        {/* Cabeçalho da Dialog */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Detalhes do Artista</h2>
            <p className={styles.subtitle}>Informações detalhadas do perfil e da conta associada.</p>
          </div>
          <button onClick={onClose} className={styles.closeButton} title="Fechar">
            ✕
          </button>
        </div>

        {/* Corpo com Scroll */}
        <div className={styles.content}>
          
          {/* Secção 1: Dados do Artista */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Perfil Artístico</h3>

            <div>
               <img style={{
            'borderRadius':'90px',
            'maxWidth':'50px',
            'maxHeight':'50px'
          }}
            src={
              artist.imageUrl
                ? `http://localhost:5000/uploads/covers/${artist.imageUrl}`
                : "/user-default.jpg"
            }
            alt=""
            width={100}
            height={100}
          />

            </div>
            
            <div className={styles.gridInfo}>
              <div className={styles.infoGroup}>
                <span className={styles.label}>Nome Artístico</span>
                <span className={styles.value}>{artist.stageName}</span>
              </div>

              <div className={styles.infoGroup}>
                <span className={styles.label}>ID do Artista</span>
                <span className={styles.valueCode}>{artist.id}</span>
              </div>

              <div className={styles.infoGroupFull}>
                <span className={styles.label}>Biografia</span>
                <p className={styles.bioText}>{artist.bio || "Sem biografia registada."}</p>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className={styles.socialGrid}>
              <div className={styles.socialItem}>
                <i className="fa fa-instagram" /> {artist.instagram || "Não vinculado"}
              </div>
              <div className={styles.socialItem}>
                <i className="fa fa-facebook" /> {artist.facebook || "Não vinculado"}
              </div>
              <div className={styles.socialItem}>
                <i className="fa fa-youtube" /> {artist.youtube || "Não vinculado"}
              </div>
              <div className={styles.socialItem}>
                <i className="fa fa-tiktok" /> {artist.tiktok || "Não vinculado"}
              </div>
            </div>
          </div>

          <hr className={styles.divider} />

          {/* Secção 2: Dados do Utilizador (Buscados por ID) */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Dados da Conta (User)</h3>

            {loadingUser && <p className={styles.loadingText}>A carregar dados do utilizador...</p>}
            {errorUser && <p className={styles.errorText}>{errorUser}</p>}

            {!loadingUser && user && (
              <div className={styles.gridInfo}>
                <div className={styles.infoGroup}>
                  <span className={styles.label}>Nome de Registo</span>
                  <span className={styles.value}>{user.name}</span>
                </div>

                <div className={styles.infoGroup}>
                  <span className={styles.label}>E-mail</span>
                  <span className={styles.value}>{user.email}</span>
                </div>

                <div className={styles.infoGroup}>
                  <span className={styles.label}>Nível de Acesso (Role)</span>
                  <span className={styles.badgeRole}>{user.role}</span>
                </div>

                <div className={styles.infoGroup}>
                  <span className={styles.label}>ID do Utilizador</span>
                  <span className={styles.valueCode}>{user.id}</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Rodapé da Dialog */}
        <div className={styles.footer}>
          <button onClick={onClose} className={styles.btnSecondary}>
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}