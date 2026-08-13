import { useEffect, useRef, useState } from "react";
import "../styles/SongPlayButton.module.css";

interface SongPlayButtonProps {
  audioUrl: string;
}

export default function SongPlayButton({
  audioUrl,
}: SongPlayButtonProps) {

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] =
    useState(false);


  const togglePlay = async () => {

    console.log("audioUrl");
    console.log(audioUrl);

    if (!audioRef.current) {
      return;
    }

    if (playing) {

      audioRef.current.pause();

      setPlaying(false);

    } else {

      try {

        await audioRef.current.play();

        setPlaying(true);

      } catch (error) {

        console.error(
          "Erro ao reproduzir áudio:",
          error
        );

      }

    }
  };


  useEffect(() => {

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }


    const handleEnded = () => {
      setPlaying(false);
    };


    audio.addEventListener(
      "ended",
      handleEnded
    );


    return () => {
      audio.removeEventListener(
        "ended",
        handleEnded
      );
    };

  }, []);


  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
      />

      <button
        type="button"
        className="song-play-button"
        onClick={togglePlay}
        title={
          playing
            ? "Pausar música"
            : "Reproduzir música"
        }
      >
        {playing ? "❚❚" : "▶"}
      </button>
    </>
  );
}  