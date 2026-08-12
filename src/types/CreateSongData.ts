export interface CreateSongData {
  title: string;
  genre: string;
  description?: string;

  cover: File;
  audio: File;
}