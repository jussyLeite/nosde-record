// src/App.tsx
import { useState } from "react";
import DashboardPage from "./features/dashboard/DashboardPage";
import LoginPage from "./features/auth/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  // O usuário começa deslogado, vendo o site publicamente
  const [view, setView] = useState<"dashboard" | "login">("dashboard");

  const handleNavigateToLogin = () => setView("login");
  const handleNavigateToDashboard = () => setView("dashboard");

  return  <AppRoutes/>
    
      {/*<div className="app-container">
      {view === "dashboard" ? (
        <DashboardPage onNavigateToLogin={handleNavigateToLogin} />
      ) : (
        <AuthProvider><LoginPage onBackToDashboard={handleNavigateToDashboard} /></AuthProvider>
        
      )}
    </div> */} 
    
   

    
    
  
}