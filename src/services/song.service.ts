import type { CreateSongData } from "../types/CreateSongData";
import type { Song } from "../types/Song";
import type { SongResponse } from "../types/SongResponse";
import type { SongsResponse } from "../types/SongsResponse";
import { api } from "./api";

export type SongStatus = 'PENDING' | 'PROCESSING' | 'PUBLISHED' | 'REJECTED' | 'DRAFT';


export async function updateSongStatusApi(songId: string, status: SongStatus): Promise<any> {
  const response = await api.patch(`/songs/${songId}/status`, { status });
  return response.data;
}

export async function getSongs(): Promise<Song[]> {
  const response = await api.get<SongsResponse>(
    "/songs/my-songs"
  );

  return response.data.data;
}


export async function getAllSongs(): Promise<Song[]> {
  const response = await api.get<SongsResponse>(
    "/songs/all"
  );

  return response.data.data;
}

export async function getAllSongsByStatus(status: SongStatus | string): Promise<Song[]> {
  // O Axios converte o objeto 'params' automaticamente em query string: /songs/all?status=PENDING
  const response = await api.get<SongsResponse>("songs/all/status", {
    params: { status }
  });

  return response.data.data;
}

export async function getLatestSongs(): Promise<Song[]> {

  const response = await api.get<SongsResponse>("/songs/lastest-songs");

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

export async function deleteSong(id: string) {
  const response = await api.delete(
    `/songs/${id}`
  );

  return response.data;
}

export async function updateSong(
  id: string,
  data: unknown
) {
  const response = await api.put(
    `/songs/${id}`,
    data
  );

  return response.data;
}
