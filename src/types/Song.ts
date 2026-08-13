import type { SongArtist } from "./SongArtist";

export interface Song {
  id: string;

  title: string;
  genre: string;
  description: string | null;

  coverImage: string | null;
  audioFile: string | null;

   duration?: number | null;

  downloads: number;

  streams: number;

    status:
    | "PUBLISHED"
    | "PENDING"
    | "PROCESSING"
    | "REJECTED"
    | "DRAFT";

  createdAt: string;
  updatedAt?: string;

  artist?: SongArtist;
}