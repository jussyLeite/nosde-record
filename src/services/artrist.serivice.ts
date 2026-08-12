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
