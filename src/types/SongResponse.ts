import type { Song } from "./Song";

export interface SongResponse {
  success: boolean;
  message?: string;
  data: Song;
}