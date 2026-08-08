import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DashboardPage from "../features/dashboard/DashboardPage";
import LoginPage from "../features/auth/LoginPage";
import DashboardArtist from "../features/Artist/DashboardArtist";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===================================== */}
        {/* ROTAS PÚBLICAS                        */}
        {/* ===================================== */}

        <Route
          path="/"
          element={<DashboardPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />


        {/* ===================================== */}
        {/* ROTAS PROTEGIDAS                      */}
        {/* ===================================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/artist/dashboard"
            element={<DashboardArtist />}
          />

        </Route>


        {/* ===================================== */}
        {/* ROTA NÃO ENCONTRADA                   */}
        {/* ===================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}