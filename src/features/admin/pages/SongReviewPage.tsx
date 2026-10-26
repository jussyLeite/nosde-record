// src/features/dashboard/pages/SongReviewPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateSongStatusApi, type SongStatus } from "../../../services/song.service";
import { api } from "../../../services/api";
import styles from "../styles/SongReviewPage.module.css";

interface SongDetails {
  id: string;
  title: string;
  genre: string;
  status: SongStatus;
  audioUrl?: string;
  imageUrl?: string;
  createdAt: string;
  artist?: {
    id: string;
    stageName: string;
    bio?: string;
  };
}

export default function SongReviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [song, setSong] = useState<SongDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSongDetails() {
      try {
        setLoading(true);
        const response = await api.get(`/songs/${id}`);
        setSong(response.data.data || response.data);
      } catch (err) {
        setError("Não foi possível carregar os detalhes da música.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchSongDetails();
  }, [id]);

  const handleStatusChange = async (newStatus: SongStatus) => {
    if (!song) return;
    try {
      setUpdating(true);
      await updateSongStatusApi(song.id, newStatus);
      setSong((prev) => (prev ? { ...prev, status: newStatus } : null));
    } catch (err) {
      alert("Erro ao atualizar o estado da música.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className={styles.loading}>A carregar submissão...</div>;
  if (error || !song) return <div className={styles.error}>{error || "Música não encontrada."}</div>;

  return (
    <div className={styles.container}>
      {/* Botão para voltar */}
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ← Voltar
      </button>

      {/* Cabeçalho Estilo Spotify com Degradé */}
      <div className={styles.heroHeader}>
        <img
          src={
            song.imageUrl
              ? `http://localhost:5000/uploads/covers/${song.imageUrl}`
              : "/user-default.jpg"
          }
          alt={song.title}
          className={styles.coverImage}
        />
        <div className={styles.heroInfo}>
          <span className={`${styles.badge} ${styles[song.status.toLowerCase()]}`}>
            {song.status}
          </span>
          <h1 className={styles.songTitle}>{song.title}</h1>
          <p className={styles.heroMeta}>
            <strong>{song.artist?.stageName || "Artista Desconhecido"}</strong> • Género: {song.genre} • Submetido em {new Date(song.createdAt).toLocaleDateString("pt-PT")}
          </p>
        </div>
      </div>

      {/* Barra de Ações Rápidas (Play e Estado Atual) */}
      <div className={styles.actionBar}>
        {song.audioUrl ? (
          <audio controls className={styles.audioPlayer}>
            <source
              src={`http://localhost:5000/uploads/audios/${song.audioUrl}`}
              type="audio/mpeg"
            />
            O seu navegador não suporta áudio.
          </audio>
        ) : (
          <span className={styles.noAudio}>Sem ficheiro de áudio anexado</span>
        )}
      </div>

      {/* Secção da Tabela / Lista de Moderação */}
      <div className={styles.contentSection}>
        <div className={styles.tableHeader}>
          <span>#</span>
          <span>Título</span>
          <span>Género</span>
          <span>Ações de Moderação</span>
        </div>

        <div className={styles.tableRow}>
          <span>1</span>
          <div className={styles.trackInfoCell}>
            <strong>{song.title}</strong>
            <span>{song.artist?.stageName || "Artista"}</span>
          </div>
          <span>{song.genre}</span>
          
          {/* Botões de Alteração de Estado Diretos na Linha */}
          <div className={styles.moderationButtons}>
            <button
              disabled={updating || song.status === "PUBLISHED"}
              onClick={() => handleStatusChange("PUBLISHED")}
              className={styles.btnApprove}
              title="Aprovar e Publicar"
            >
              Aprovar
            </button>
            <button
              disabled={updating || song.status === "REJECTED"}
              onClick={() => handleStatusChange("REJECTED")}
              className={styles.btnReject}
              title="Rejeitar"
            >
              Rejeitar
            </button>
            <button
              disabled={updating || song.status === "PROCESSING"}
              onClick={() => handleStatusChange("PROCESSING")}
              className={styles.btnProcess}
              title="Colocar em Processamento"
            >
              Processar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}