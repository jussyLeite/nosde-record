import type { ArtistUser } from "./ArtistUser";

export interface Artist 
{ 
    id: string; 
    stageName: string; 
    bio: string | null; 
    imageUrl: string | null; 
    facebook: string | null; 
    instagram: string | null; 
    youtube: string | null; 
    tiktok: string | null; 
    userId: string; 
    createdAt: string; 
    updatedAt: string; 
    user: ArtistUser; 
}