import { api } from "./api";


// ======================================================
// CREDENCIAIS DE LOGIN
// ======================================================

export interface LoginCredentials {
  email: string;
  password: string;
}


// ======================================================
// CREDENCIAIS DE REGISTO
// ======================================================

export interface RegisterCredentials {
  nome: string;
  email: string;
  password: string;
}


// ======================================================
// UTILIZADOR AUTENTICADO
// ======================================================

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}


// ======================================================
// RESPOSTA DA API
// ======================================================

export interface AuthResponse {
  success: boolean;

  data: {
    token: string;
    user: AuthUser;
  };
}


// ======================================================
// SERVIÇO DE AUTENTICAÇÃO
// ======================================================

export const authService = {

  // ----------------------------------------------------
  // LOGIN
  // ----------------------------------------------------

  login: async (
    credentials: LoginCredentials
  ): Promise<AuthResponse> => {

    const response = await api.post<AuthResponse>(
      "/auth/login",
      credentials
    );

    return response.data;
  },


  // ----------------------------------------------------
  // REGISTO
  // ----------------------------------------------------

  register: async (
    credentials: RegisterCredentials
  ): Promise<AuthResponse> => {

    const response = await api.post<AuthResponse>(
      "/auth/register",
      credentials
    );

    return response.data;
  },

};