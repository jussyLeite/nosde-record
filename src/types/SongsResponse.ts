import type { Song } from "./Song";

export interface SongsResponse {
  success: boolean;
  message?: string;
  data: Song[];
}