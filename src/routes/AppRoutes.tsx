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
import ArtistProfile from "../features/Artist/pages/ArtistProfile";
import ArtistLayout from "../features/Artist/layouts/ArtistLayout";
import ArtistMusic from "../features/Artist/pages/ArtistMusicUpload";
import ArtistMyMusic from "../features/Artist/pages/ArtistMusic";

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

          <Route path="/artist" element={<ArtistLayout />}>

    
           {/*<Route
              index
              element={
                <Navigate
                  to="/artist/dashboard"
                  replace
                />
              }
            /> */} 
            
            {/* 
             <Route
              path="dashboard"
              element={<DashboardArtist />}
            />


            */}

             <Route
              path="dashboard"
              element={<DashboardArtist />}
            />
            
            <Route
              path="profile"
              element={<ArtistProfile />}
            />

            <Route
                path="musicupload"
                element={<ArtistMusic />}
                />
            <Route 
             path="music"
             element={<ArtistMyMusic/>}
             />

          </Route>

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