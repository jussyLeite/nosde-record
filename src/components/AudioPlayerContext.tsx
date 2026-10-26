import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { Song } from "../types/Song";

interface AudioPlayerContextData {
  currentSong: Song | null;

  isPlaying: boolean;

  currentTime: number;

  duration: number;

  playSong: (song: Song) => void;

  togglePlay: () => void;

  pauseSong: () => void;

  nextSong: () => void;

  previousSong: () => void;

  seek: (time: number) => void;

  setVolume: (volume: number) => void;

  setPlaylist: (songs: Song[]) => void;
  closePlayer: () => void;
}

const AudioPlayerContext =
  createContext<AudioPlayerContextData | undefined>(
    undefined
  );

export function AudioPlayerProvider({
  children,
}: {
  children: ReactNode;
}) {

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const [currentSong, setCurrentSong] =
    useState<Song | null>(null);

  const [playlist, setPlaylist] =
    useState<Song[]>([]);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);


  /*
   * Criar o elemento de áudio apenas uma vez
   */
  useEffect(() => {

    const audio =
      new Audio();

    audioRef.current = audio;


    const handleTimeUpdate = () => {

      setCurrentTime(
        audio.currentTime
      );

    };


    const handleLoadedMetadata = () => {

      setDuration(
        audio.duration || 0
      );

    };


    const handleEnded = () => {

      nextSong();

    };


    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    audio.addEventListener(
      "ended",
      handleEnded
    );


    return () => {

      audio.pause();

      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.removeEventListener(
        "ended",
        handleEnded
      );

    };

  }, []);


  /*
   * Tocar música
   */
  const playSong = async (
    song: Song
  ) => {

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }


    const url =
      `${song.audioFile}`;
      


    /*
     * Se for outra música,
     * trocar o source.
     */
    if (
      currentSong?.id !== song.id
    ) {

      audio.pause();

      audio.src = url;

      audio.currentTime = 0;

      setCurrentSong(song);

      setCurrentTime(0);

    }


    try {

      await audio.play();

      setIsPlaying(true);

    } catch (error) {

      console.error(
        "Erro ao reproduzir música:",
        error
      );

    }

  };


  /*
   * Play / Pause
   */
  const togglePlay = async () => {

    const audio =
      audioRef.current;

    if (!audio || !currentSong) {
      return;
    }


    if (audio.paused) {

      await audio.play();

      setIsPlaying(true);

    } else {

      audio.pause();

      setIsPlaying(false);

    }

  };


  const pauseSong = () => {

    audioRef.current?.pause();

    setIsPlaying(false);

  };


  /*
   * Próxima música
   */
  const nextSong = () => {

    if (!currentSong) {
      return;
    }


    const index =
      playlist.findIndex(
        (song) =>
          song.id === currentSong.id
      );


    if (
      index === -1 ||
      index >= playlist.length - 1
    ) {

      setIsPlaying(false);

      return;

    }


    const next =
      playlist[index + 1];

    playSong(next);

  };


  /*
   * Música anterior
   */
  const previousSong = () => {

    if (!currentSong) {
      return;
    }


    const index =
      playlist.findIndex(
        (song) =>
          song.id === currentSong.id
      );


    if (index <= 0) {

      return;

    }


    const previous =
      playlist[index - 1];

    playSong(previous);

  };

  /*  */

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = ""; // Limpa o ficheiro carregado
    }
    setIsPlaying(false);
    setCurrentSong(null);
    setCurrentTime(0);
    setDuration(0);
  };


  /*
   * Seek
   */
  const seek = (
    time: number
  ) => {

    if (!audioRef.current) {
      return;
    }

    audioRef.current.currentTime =
      time;

    setCurrentTime(time);

  };


  /*
   * Volume
   */
  const setVolume = (
    volume: number
  ) => {

    if (!audioRef.current) {
      return;
    }

    audioRef.current.volume =
      volume;

  };


  return (
    <AudioPlayerContext.Provider
      value={{
        currentSong,

        isPlaying,

        currentTime,

        duration,

        playSong,

        togglePlay,

        pauseSong,

        nextSong,

        previousSong,

        seek,

        setVolume,

        setPlaylist,
        closePlayer
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}


export function useAudioPlayer() {

  const context =
    useContext(
      AudioPlayerContext
    );


  if (!context) {

    throw new Error(
      "useAudioPlayer must be used inside AudioPlayerProvider"
    );

  }
  return context;
}