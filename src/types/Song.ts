import type { SongArtist } from "./SongArtist";

export interface Song {
  id: string;

  title: string;
  genre: string;
  description: string | null;

  cover: string | null;
  audio: string | null;

  status: string;

  createdAt: string;
  updatedAt?: string;

  artist?: SongArtist;
}