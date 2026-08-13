import {
  useLocation,
} from "react-router-dom";

import {
  useAudioPlayer,
} from "../../../components/AudioPlayerContext";

import GlobalAudioPlayer from "./GlobalAudioPlayer";


export default function GlobalAudioPlayerRenderer() {

  const location =
    useLocation();


  const {
    currentSong,
  } = useAudioPlayer();


  /*
   * Ajusta este caminho para o path
   * real da tua página.
   */
  const isMusicPage =
    location.pathname ===
    "/artist/music";


  /*
   * Dentro da página de músicas:
   * não mostrar player global.
   */
  if (isMusicPage) {
    return null;
  }


  /*
   * Fora da página:
   * mostrar o player global.
   */
  if (!currentSong) {
    return null;
  }


  return (
    <GlobalAudioPlayer />
  );
}