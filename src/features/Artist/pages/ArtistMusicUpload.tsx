import { useEffect, useState } from "react";
import UploadSongDialog from "../component/UploadSongDialog";
import type { Song } from "../../../types/Song";
import type { CreateSongData } from "../../../types/CreateSongData";
import { createSong, getSongs } from "../../../services/song.service";

import "../styles/ArtistMusic.css";
import SongPlayButton from "../component/SongPlayButton";

export default function ArtistMusic() {

  const [songs, setSongs] =
    useState<Song[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [isUploadOpen, setIsUploadOpen] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);


  /* =====================================================
     CARREGAR MÚSICAS
  ===================================================== */

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


  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {

    loadSongs();

  }, []);


  /* =====================================================
     UPLOAD
  ===================================================== */

  const handleUpload = async (
    data: CreateSongData
  ) => {

    try {

      setUploading(true);

      setError(null);

      const newSong =
        await createSong(data);

      /*
       * Colocar a música nova no topo
       * imediatamente.
       */

    console.log("Response");
      console.log(newSong);

      setSongs((previous) => [
        newSong,
        ...previous,
      ]);

      setIsUploadOpen(false);

    } catch (error) {

     
      throw error;

    } finally {

      setUploading(false);

    }
  };


  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate = (
    date: string
  ) => {

    return new Intl.DateTimeFormat(
      "pt-PT",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    ).format(new Date(date));

  };


  /* =====================================================
     STATUS
  ===================================================== */

  const getStatusLabel = (
    status: string
  ) => {

    switch (status.toUpperCase()) {

      case "PUBLISHED":
        return "Publicado";

      case "PENDING":
        return "Pendente";

      case "PROCESSING":
        return "Processando";

      case "REJECTED":
        return "Rejeitado";

      case "DRAFT":
        return "Rascunho";

      default:
        return status;

    }
  };


  const getStatusClass = (
    status: string
  ) => {

    switch (status.toUpperCase()) {

      case "PUBLISHED":
        return "song-status song-status-success";

      case "PENDING":
        return "song-status song-status-pending";

      case "PROCESSING":
        return "song-status song-status-processing";

      case "REJECTED":
        return "song-status song-status-error";

      default:
        return "song-status";

    }
  }; 


  return (
    <div className="artist-music-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="artist-music-header">

        <div>

          <h1>
            Minhas músicas
          </h1>

          <p>
            Gere e publica as tuas músicas
            na Nosde Record.
          </p>

        </div>


        <button
          type="button"
          className="artist-music-upload-btn"
          onClick={() =>
            setIsUploadOpen(true)
          }
        >
          <span>+</span>

          Upload de música
        </button>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="artist-music-error">
          {error}
        </div>
      )}


      {/* =================================================
          CARD
      ================================================= */}

      <div className="artist-music-card">

        <div className="artist-music-card-header">

          <div>

            <h2>
              Catálogo de músicas
            </h2>

            <span>
              {songs.length}{" "}
              {songs.length === 1
                ? "música"
                : "músicas"}
            </span>

          </div>

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="artist-music-loading">

            <div className="music-spinner" />

            <span>
              A carregar músicas...
            </span>

          </div>

        ) : songs.length === 0 ? (

          /* =================================================
             EMPTY
          ================================================= */

          <div className="artist-music-empty">

            <div className="music-empty-icon">
              ♪
            </div>

            <h3>
              Ainda não tens músicas
            </h3>

            <p>
              Faz o upload da tua primeira
              música para começar.
            </p>

            <button
              type="button"
              onClick={() =>
                setIsUploadOpen(true)
              }
              className="artist-music-upload-btn"
            >
              + Upload de música
            </button>

          </div>

        ) : (

          /* =================================================
             TABLE
          ================================================= */

          <div className="artist-music-table-wrapper">

            <table className="artist-music-table">

              <thead>

                <tr>

                  <th>
                    Play
                  </th>

                  <th>
                    Música
                  </th>

                  <th>
                    Género
                  </th>

                  <th>
                    Artista
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Data
                  </th>


                </tr>

              </thead>


              <tbody>

                {songs.map((song) => (

                  <tr key={song.id}>

                    {/* ==========================
                        MÚSICA
                    ========================== */}

                    <td>
                    <td>
                      <SongPlayButton 
                        audioUrl={`${song.audioFile}`} 
                      />
                    </td>

                  </td>

                    <td>

                      <div className="song-title-cell">

                        {song.coverImage ? (

                          <img
                            src={`/covers/${song.coverImage}`}
                            alt={song.title}
                            className="song-cover"
                          />

                        ) : (

                          <div className="song-cover-placeholder">
                            ♪
                          </div>

                        )}


                        <div>

                          <strong>
                            {song.title}
                          </strong>

                          {song.description && (
                            <span>
                              {song.description}
                            </span>
                          )}

                        </div>

                      </div>

                    </td>


                    {/* ==========================
                        GÉNERO
                    ========================== */}

                    <td>

                      <span className="song-genre">
                        {song.genre}
                      </span>

                    </td>


                    {/* ==========================
                        ARTISTA
                    ========================== */}

                    <td>

                      <div className="song-artist">

                        <span className="song-artist-avatar">
                          {song.artist?.stageName
                            ?.charAt(0)
                            .toUpperCase() ?? "A"}
                        </span>

                        <span>
                          {song.artist?.stageName ??
                            "Artista"}
                        </span>

                      </div>

                    </td>


                    {/* ==========================
                        STATUS
                    ========================== */}

                    <td>

                      <span
                        className={getStatusClass(
                          song.status
                        )}
                      >
                        {getStatusLabel(
                          song.status
                        )}
                      </span>

                    </td>
                

                    {/* ==========================
                        DATA
                    ========================== */}

                    <td>

                      <span className="song-date">
                        {formatDate(
                          song.createdAt
                        )}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* =================================================
          UPLOAD DIALOG
      ================================================= */}

      <UploadSongDialog
        open={isUploadOpen}
        loading={uploading}
        onClose={() =>
          setIsUploadOpen(false)
        }
        onUpload={handleUpload}
      />

    </div>
  );
}