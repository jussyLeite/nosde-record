import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import ArtistSidebar from "../../Artist/component/ArtistSidebar";
import styles from "../../Artist/styles/ArtistLayout.module.css";
import AdminSidebar from "../component/AdminSidebar";
import { AudioPlayerProvider } from "../../../components/AudioPlayerContext";
import GlobalAudioPlayer from "../../Artist/component/GlobalAudioPlayer";


interface AdminLayoutProps {
  children?: ReactNode;
}


export default function AdminLayout({
  children,
}: AdminLayoutProps) {

  return (

    <div className={styles.layout}>

     {/* <ArtistSidebar /> */ }
     <AdminSidebar/>

      {/* ================================================
          ÁREA PRINCIPAL
      ================================================= */}


      <AudioPlayerProvider>

            <main className={styles.main}>

            <div className={styles.content}>

              {children ?? <Outlet />}

            </div>

          </main>
        
         <GlobalAudioPlayer />
       </AudioPlayerProvider>
           
    </div>

  );
}