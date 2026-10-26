import type { Song } from "../../../types/Song";

import { useAudioPlayer } from "../../../components/AudioPlayerContext";
import  '../styles/SongAdminRow.module.css';
import styles from '../styles/btnstyle.module.css';
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface SongAdminRowProps {
  song: Song;
  onEdit?: (song: Song) => void;
  onDelete?: (song: Song) => void;
}

export default function SongAdminRow({
  song,
  onEdit,
  onDelete
}: SongAdminRowProps) {

  const auth = useAuth();
  const navigate = useNavigate();
     
       if (!auth) {
         return null;
       }
     
  const { user } = auth;

  const {
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
  } = useAudioPlayer();


  const isCurrent =
    currentSong?.id === song.id;

    
  const handlePlay = () => {

    if (isCurrent) {

      togglePlay();

      return;

    }

    playSong(song);

  };


  return (
    <tr
      onClick={() => navigate(`/admin/submissions/${song.id}`)}
      style={{ cursor: "pointer" }}
    >

      <td>

        <button
          className={`song-play-button ${
            isCurrent && isPlaying
              ? "playing"
              : ""
          }`}
          onClick={handlePlay}
        >
          {isCurrent && isPlaying
            ? "❚❚"
            : "▶"}
        </button>

      </td>


      <td>

        <div className={styles.songtableinfo}>

          <img
            src={
              song.coverImage
                ? `http://localhost:5000/uploads/covers/${song.coverImage}`
                : "/default-cover.png"
            }
            alt=""
          />

          <div>

            <strong>
              {song.title}
            </strong>
             <br/>
            <span>
              {song.artist?.stageName || 'undefined'}
            </span>

          </div>

        </div>

      </td>


      <td>
        {song.genre}
      </td>


      <td>
        <span
          className={`song-status ${song.status.toLowerCase()}`}
        >
          {song.status}
        </span>
      </td>


      <td>
        {song.streams}
      </td>


      <td>
        {song.downloads}
      </td>


      <td>
        {new Date(
          song.createdAt
        ).toLocaleDateString("pt-PT")}
      </td>

       {/* AÇÕES */}
      <td>
        {user?.role === "ADMIN" && (
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.editButton}
              onClick={() => onEdit?.(song)}
              title="Editar música"
            >
              <i
                className="fa fa-pencil"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => onDelete?.(song)}
              title="Remover música"
            >
              <i
                className="fa fa-trash"
                aria-hidden="true"
              />
            </button>
          </div>
        )}
      </td>

    
    </tr>

    
  );
}