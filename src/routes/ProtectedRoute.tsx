import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";


export default function ProtectedRoute() {

  const {
    isAuthenticated,
    isLoading,
  } = useAuth();


  // ==================================================
  // VERIFICANDO SESSÃO
  // ==================================================

  if (isLoading) {

    return (
      <div>
        Carregando...
      </div>
    );

  }


  // ==================================================
  // NÃO AUTENTICADO
  // ==================================================

  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // ==================================================
  // AUTENTICADO
  // ==================================================

  return <Outlet />;
}