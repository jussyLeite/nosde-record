import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import ArtistSidebar from "../component/ArtistSidebar";
import styles from "../styles/ArtistLayout.module.css";
import { AudioPlayerProvider } from "../../../components/AudioPlayerContext";
import GlobalAudioPlayer from "../component/GlobalAudioPlayer";


interface ArtistLayoutProps {
  children?: ReactNode;
}


export default function ArtistLayout({
  children,
}: ArtistLayoutProps) {

  return (

    <div className={styles.layout}>

      {/* ================================================
          SIDEBAR
      ================================================= */}

      <ArtistSidebar />


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