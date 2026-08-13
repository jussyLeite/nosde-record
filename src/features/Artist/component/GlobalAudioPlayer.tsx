import {
  useEffect,
  useState,
} from "react";

import {
  useAudioPlayer,
} from "../../../components/AudioPlayerContext";

import styles from "../styles/GlobalAudioPlayer.module.css";


function formatTime(seconds: number) {

  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes =
    Math.floor(seconds / 60);

  const remaining =
    Math.floor(seconds % 60);

  return `${minutes}:${remaining
    .toString()
    .padStart(2, "0")}`;
}


export default function GlobalAudioPlayer() {

  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,

    togglePlay,
    nextSong,
    previousSong,

    seek,
    closePlayer,
  } = useAudioPlayer();


  const [visible, setVisible] =
    useState(true);


  useEffect(() => {

    if (currentSong) {
      setVisible(true);
    }

  }, [currentSong]);


  if (
    !currentSong ||
    !visible
  ) {
    return null;
  }


  const coverUrl =
    currentSong.coverImage
      ? `http://localhost:5000/uploads/covers/${currentSong.coverImage}`
      : "/default-cover.png";


  const progress =
    duration > 0
      ? (currentTime / duration) * 100
      : 0;


  const handleClose = () => {

    setVisible(false);

    closePlayer();

  };


  return (
    <div
      className={
        styles.player
      }
    >

      {/* CAPA */}

      <img
        src={coverUrl}
        alt={currentSong.title}
        className={styles.cover}
      />


      {/* INFORMAÇÃO */}

      <div
        className={styles.info}
      >

        <strong>
          {currentSong.title}
        </strong>

        <span>
          {currentSong.artist?.stageName ||
            "Artista"}
        </span>

      </div>


      {/* CONTROLES */}

      <div
        className={styles.controls}
      >

        <button
          onClick={previousSong}
          title="Anterior"
        >
          ⏮
        </button>


        <button
          className={styles.play}
          onClick={togglePlay}
        >
          {isPlaying
            ? "❚❚"
            : "▶"}
        </button>


        <button
          onClick={nextSong}
          title="Próxima"
        >
          ⏭
        </button>

      </div>


      {/* PROGRESS */}

      <div
        className={styles.progressArea}
      >

        <span>
          {formatTime(currentTime)}
        </span>


        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(event) =>
            seek(
              Number(
                event.target.value
              )
            )
          }
          style={{
            "--progress":
              `${progress}%`,
          } as React.CSSProperties}
        />


        <span>
          {formatTime(duration)}
        </span>

      </div>


      {/* FECHAR */}

      <button
        className={styles.close}
        onClick={handleClose}
        title="Fechar player"
      >
        ×
      </button>

    </div>
  );
}