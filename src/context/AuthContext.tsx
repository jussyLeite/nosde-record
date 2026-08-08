import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

import {
  type LoginCredentials,
  type AuthResponse,
  type AuthUser,
  authService,
} from "../services/auth.service";

import { api } from "../services/api";


// ======================================================
// CHAVES DO LOCAL STORAGE
// ======================================================

const TOKEN_KEY = "@NosdeRecord:token";
const USER_KEY = "@NosdeRecord:user";


// ======================================================
// TIPO DO CONTEXTO
// ======================================================

interface AuthContextType {

  // Indica se existe um utilizador autenticado
  isAuthenticated: boolean;

  // Utilizador atualmente autenticado
  user: AuthUser | null;

  // Indica se estamos a verificar a sessão
  isLoading: boolean;

  // Login
  login: (
    credentials: LoginCredentials
  ) => Promise<void>;

  // Logout
  logout: () => void;
}


// ======================================================
// CONTEXT
// ======================================================

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);


// ======================================================
// AUTH PROVIDER
// ======================================================

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  // ----------------------------------------------------
  // ESTADO DO UTILIZADOR
  // ----------------------------------------------------

  const [user, setUser] = useState<AuthUser | null>(
    null
  );


  // ----------------------------------------------------
  // ESTADO DE CARREGAMENTO
  // ----------------------------------------------------

  const [isLoading, setIsLoading] = useState(true);


  // ====================================================
  // RECUPERAR SESSÃO AO ABRIR A APLICAÇÃO
  // ====================================================

  useEffect(() => {

    const savedToken =
      localStorage.getItem(TOKEN_KEY);

    const savedUser =
      localStorage.getItem(USER_KEY);


    // --------------------------------------------------
    // Não existe sessão guardada
    // --------------------------------------------------

    if (!savedToken || !savedUser) {

      setIsLoading(false);

      return;
    }


    // --------------------------------------------------
    // Tenta recuperar a sessão
    // --------------------------------------------------

    try {

      const parsedUser: AuthUser =
        JSON.parse(savedUser);


      // Guarda utilizador no estado
      setUser(parsedUser);


      // Configura JWT no Axios
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${savedToken}`;


    } catch (error) {

      console.error(
        "Erro ao recuperar sessão:",
        error
      );


      // Dados corrompidos
      localStorage.removeItem(TOKEN_KEY);

      localStorage.removeItem(USER_KEY);

      delete api.defaults.headers.common[
        "Authorization"
      ];

      setUser(null);

    } finally {

      setIsLoading(false);

    }

  }, []);


  // ====================================================
  // LOGIN
  // ====================================================

  const login = async (
    credentials: LoginCredentials
  ): Promise<void> => {

    const response: AuthResponse =
      await authService.login(credentials);


    // --------------------------------------------------
    // Verifica resposta do backend
    // --------------------------------------------------

    if (
      !response.success ||
      !response.data?.token ||
      !response.data?.user
    ) {

      throw new Error(
        "Resposta de autenticação inválida."
      );

    }


    const token = response.data.token;

    const authenticatedUser =
      response.data.user;


    // --------------------------------------------------
    // Atualiza estado
    // --------------------------------------------------

    setUser(authenticatedUser);


    // --------------------------------------------------
    // Guarda sessão
    // --------------------------------------------------

    localStorage.setItem(
      TOKEN_KEY,
      token
    );

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(authenticatedUser)
    );


    // --------------------------------------------------
    // Configura JWT para Axios
    // --------------------------------------------------

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;


    console.log(
      "Login realizado:",
      authenticatedUser
    );

  };


  // ====================================================
  // LOGOUT
  // ====================================================

  const logout = () => {

    // Remove utilizador do estado
    setUser(null);


    // Remove token
    localStorage.removeItem(
      TOKEN_KEY
    );


    // Remove utilizador
    localStorage.removeItem(
      USER_KEY
    );


    // Remove Authorization do Axios
    delete api.defaults.headers.common[
      "Authorization"
    ];

  };


  // ====================================================
  // VALOR DO CONTEXTO
  // ====================================================

  const value: AuthContextType = {

    isAuthenticated: !!user,

    user,

    isLoading,

    login,

    logout,

  };


  // ====================================================
  // PROVIDER
  // ====================================================

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


// ======================================================
// HOOK useAuth
// ======================================================

export function useAuth(): AuthContextType {

  const context = useContext(AuthContext);


  if (!context) {

    throw new Error(
      "useAuth deve ser utilizado dentro de um AuthProvider."
    );

  }


  return context;
}