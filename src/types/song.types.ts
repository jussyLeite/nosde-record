export interface Artist {
  id: string;
  stageName: string;
}

export interface Song {
  id: string;

  title: string;

  description?: string | null;

  genre: string;

  coverImage?: string | null;

  audioFile: string;

  duration?: number | null;

  downloads: number;

  streams: number;

  status:
    | "PUBLISHED"
    | "PENDING"
    | "PROCESSING"
    | "REJECTED"
    | "DRAFT";

  artistId: string;

  artist: Artist;

  createdAt: string;

  updatedAt: string;
}