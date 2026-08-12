import type { CreateSongData } from "../types/CreateSongData";
import type { Song } from "../types/Song";
import type { SongResponse } from "../types/SongResponse";
import type { SongsResponse } from "../types/SongsResponse";
import { api } from "./api";


export async function getSongs(): Promise<Song[]> {
  const response = await api.get<SongsResponse>(
    "/songs/all"
  );

  return response.data.data;
}

export async function createSong(
  data: CreateSongData
) {

  const formData = new FormData();

  formData.append(
    "title",
    data.title
  );

  formData.append(
    "genre",
    data.genre
  );

  formData.append(
    "description",
    data.description ?? ""
  );

  formData.append(
    "cover",
    data.cover
  );

  formData.append(
    "audio",
    data.audio
  );


  /*
   * NÃO colocar:
   *
   * headers: {
   *   "Content-Type": "multipart/form-data"
   * }
   *
   * O browser trata isso automaticamente.
   */

  const response = await api.post(
    "/songs",
    formData
  );

  return response.data.data;
}
