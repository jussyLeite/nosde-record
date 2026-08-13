import {
  useEffect,
  useState,
} from "react";

import {
  useAudioPlayer,
} from "../AudioPlayerContext";

import styles from "./MusicPlayer.module.css";


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


export default function MusicPlayer() {

  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,

    togglePlay,
    nextSong,
    previousSong,

    seek,
    setVolume,
  } = useAudioPlayer();


  const [
    volume,
    setLocalVolume,
  ] = useState(1);


  const [
    isMuted,
    setIsMuted,
  ] = useState(false);


  /*
   * Quando não existe música selecionada,
   * não mostramos o leitor.
   */
  if (!currentSong) {
    return null;
  }


  const coverUrl =
    currentSong.coverImage
      ? `/covers/${currentSong.coverImage}`
      : "/default-cover.png";


  const progress =
    duration > 0
      ? (currentTime / duration) * 100
      : 0;


  const handleVolumeChange = (
    value: number
  ) => {

    setLocalVolume(value);

    setVolume(value);

    setIsMuted(value === 0);
  };


  const handleMute = () => {

    if (isMuted) {

      setVolume(volume);

      setIsMuted(false);

    } else {

      setVolume(0);

      setIsMuted(true);

    }
  };


  return (
    <section
      className={
        styles.player
      }
    >

      {/* =====================================
          BACKGROUND
      ====================================== */}

      <div
        className={styles.background}
        style={{
          backgroundImage:
            `url("${coverUrl}")`,
        }}
      />


      <div
        className={styles.overlay}
      />


      {/* =====================================
          CONTENT
      ====================================== */}

      <div
        className={styles.content}
      >

        {/* =================================
            COVER
        ================================== */}

        <div
          className={styles.coverWrapper}
        >

          <img
            src={coverUrl}
            alt={currentSong.title}
            className={styles.cover}
          />

        </div>


        {/* =================================
            INFORMATION
        ================================== */}

        <div
          className={styles.info}
        >

          <span
            className={styles.type}
          >
            Música
          </span>


          <h1
            className={styles.title}
          >
            {currentSong.title}
          </h1>


          <div
            className={styles.artist}
          >
            {currentSong.artist?.stageName ||
              "Artista"}
          </div>


          <div
            className={styles.metadata}
          >

            <span>
              {currentSong.genre}
            </span>

            <span>
              •
            </span>

            <span>
              {currentSong.streams} streams
            </span>

            <span>
              •
            </span>

            <span>
              {currentSong.downloads} downloads
            </span>

          </div>

        </div>

      </div>


      {/* =====================================
          PLAYER CONTROLS
      ====================================== */}

      <div
        className={styles.controlsArea}
      >

        {/* CONTROLS */}

        <div
          className={styles.controls}
        >

          <button
            className={styles.secondaryButton}
            onClick={previousSong}
            title="Música anterior"
          >
            ⏮
          </button>


          <button
            className={styles.playButton}
            onClick={togglePlay}
            title={
              isPlaying
                ? "Pausar"
                : "Reproduzir"
            }
          >
            {isPlaying
              ? "❚❚"
              : "▶"}
          </button>


          <button
            className={styles.secondaryButton}
            onClick={nextSong}
            title="Próxima música"
          >
            ⏭
          </button>

        </div>


        {/* =================================
            PROGRESS
        ================================== */}

        <div
          className={styles.progressContainer}
        >

          <span
            className={styles.time}
          >
            {formatTime(currentTime)}
          </span>


          <div
            className={styles.progressWrapper}
          >

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
              className={
                styles.progress
              }
              style={{
                "--progress":
                  `${progress}%`,
              } as React.CSSProperties}
            />

          </div>


          <span
            className={styles.time}
          >
            {formatTime(duration)}
          </span>

        </div>


        {/* =================================
            VOLUME
        ================================== */}

        <div
          className={styles.volume}
        >

          <button
            className={styles.volumeButton}
            onClick={handleMute}
          >
            {isMuted
              ? "🔇"
              : "🔊"}
          </button>


          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={
              isMuted
                ? 0
                : volume
            }
            onChange={(event) =>
              handleVolumeChange(
                Number(
                  event.target.value
                )
              )
            }
            className={
              styles.volumeSlider
            }
          />

        </div>

      </div>

    </section>
  );
}