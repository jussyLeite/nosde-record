import { useEffect, useState } from "react";
import UploadSongDialog from "../component/UploadSongDialog";
import type { Song } from "../../../types/Song";
import type { CreateSongData } from "../../../types/CreateSongData";
import { createSong, getSongs } from "../../../services/song.service";

import "../styles/ArtistMusic.css";
import SongPlayButton from "../component/SongPlayButton";
import { useAudioPlayer } from "../../../components/AudioPlayerContext";
import SongTable from "../component/SongTable";
import MusicPlayer from "../../../components/MusicPlayer/MusicPlayer";

export default function ArtistMyMusic() {

  const [songs, setSongs] =
    useState<Song[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);


    const {
  setPlaylist,
} = useAudioPlayer();


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
      setPlaylist(sortedSongs);

      console.log("playlist");
      console.log(sortedSongs);
    
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

  }, [setPlaylist]);



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
        </div>

      </div>

      <div className="">
       
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

          </div>

        ) : (

          /* =================================================
             TABLE
          ================================================= */

          <div className="artist-music-table-wrapper">
                  <div className="songs-card">

        {loading ? (

          <div className="songs-loading">
            Carregando músicas...
          </div>

        ) : (

            <div>

                <MusicPlayer />
                 <SongTable
               songs={songs}
              />
            </div>


        )}

      </div>

          </div>

        )}

      </div>


      {/* =================================================
          UPLOAD DIALOG
      ================================================= */}

      {/*<UploadSongDialog
        open={isUploadOpen}
        loading={uploading}
        onClose={() =>
          setIsUploadOpen(false)
        }
        onUpload={handleUpload}
      /> */}

    </div>
  );
}