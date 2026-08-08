// src/features/dashboard/DashboardPage.tsx
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import UpsellBanner from "./components/UpsellBanner";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";



//export default function DashboardPage({ onNavigateToLogin }: DashboardPageProps) {
export default function DashboardPage() {

  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate("/login");
    console.log("Navigate to login...");
  };

  return (
    <div className={styles.dashboardLayout}>
      <div className={styles.mainGrid}>
        <aside className={styles.sidebarWrapper}>
          <Sidebar onRequiredAuth={handleNavigateToLogin} />
        </aside>
        
        <main className={styles.contentWrapper}>
          <MainContent onNavigateToLogin={handleNavigateToLogin} />
        </main>
      </div>

      <footer className={styles.footerWrapper}>
        <UpsellBanner onRequiredAuth={handleNavigateToLogin} />
      </footer>
    </div>
  );
}