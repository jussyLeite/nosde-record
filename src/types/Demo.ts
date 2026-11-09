export type DemoStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Demo {
  id: string;
  nomeArtistico: string;
  email: string;
  audioUrl: string;
  mensagem: string;
  status: DemoStatus;
  createdAt: string;
  updatedAt: string;
  obs?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Interface que espelha exatamente o JSON que o backend devolve
export interface DemosApiResponse {
  success: boolean;
  message: string;
  data: Demo[];
  pagination: Pagination;
}