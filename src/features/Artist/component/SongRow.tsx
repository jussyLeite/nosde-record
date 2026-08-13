import type { Song } from "../../../types/Song";

import { useAudioPlayer } from "../../../components/AudioPlayerContext";
import '../styles/SongRow.module.css';

interface SongRowProps {
  song: Song;
}

export default function SongRow({
  song,
}: SongRowProps) {

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
    <tr>

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

        <div className="song-table-info">

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

            <span>
              {song.artist?.stageName}
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

    </tr>
  );
}