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
import DashboardAdmin from "../features/admin/DashboardAdmin";
import AdminLayout from "../features/admin/layouts/AdminLayout";
import AdminDashboard from "../features/admin/pages/AdminDashboardPage";
import AdminCatalog from "../features/admin/pages/AdminCatalog";
import Artist from "../features/admin/pages/Artists.";
import SubmissionsPage from "../features/admin/pages/Submissions";
import SongReviewPage from "../features/admin/pages/SongReviewPage";
import UsersPage from "../features/admin/pages/UsersPage";

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

         <Route path="/admin" element={<AdminLayout />} >

          <Route
              path="dashboard"
              element={ <AdminDashboard/> }
          />

           <Route
              path="catalog"
              element={ <AdminCatalog/> }
          />  

          <Route
              path="artists"
              element={ <Artist /> }
          />

          <Route
           path="submission"
           element={ <SubmissionsPage /> }
          />

          <Route
           path="users"
           element={ <UsersPage /> }
          />

          <Route 
            path="submissions/:id" 
            element={<SongReviewPage />} 
          />
         
         </Route>

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