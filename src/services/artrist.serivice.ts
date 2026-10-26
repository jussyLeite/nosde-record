import { api } from "./api";

/**
 * Dados do usuário associado ao artista
 */
export interface ArtistUser {
  id: string;
  name: string;
  email: string;
}

/**
 * Dados completos do artista
 */
export interface Artist {
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

/**
 * Resposta da API
 */
interface ArtistResponse {
  success: boolean;
  data: Artist;
}

interface ArtistResponse2 {
  success: boolean;
  data: Artist[];
}

/**
 * Dados permitidos para atualização
 */
export interface UpdateArtistData {
  stageName?: string;
  bio?: string | null;
  imageUrl?: string | null;

  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
}

/**
 * =====================================================
 * GET /api/artists/me
 * =====================================================
 *
 * Busca o perfil do artista autenticado.
 *
 * O token é adicionado automaticamente pelo api.ts.
 */
export async function getMyArtistProfile(): Promise<Artist> {
  const response = await api.get<ArtistResponse>(
    "/artists/me"
  );

  return response.data.data;
}


export async function getAllArtist(): Promise<ArtistResponse2> {
  const response = await api.get<ArtistResponse2>(
    "/artists/all"
  )
  return response.data;
}


export interface UserDetail {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export const userService = {
  getUserById: async (userId: string): Promise<UserDetail> => {
    const response = await api.get(`/users/${userId}`);
    // Ajusta conforme a estrutura do teu Node.js (ex: response.data ou response.data.data)
    return response.data.data || response.data;
  }
};

/**
 * =====================================================
 * PUT /api/artists/me
 * =====================================================
 *
 * Atualiza o perfil do artista autenticado.
 *
 * O token também é enviado automaticamente pelo api.ts.
 */
export async function updateMyArtistProfile(
  data: UpdateArtistData
): Promise<Artist> {
  const response = await api.put<ArtistResponse>(
    "/artists/me",
    data
  );

  return response.data.data;
}
