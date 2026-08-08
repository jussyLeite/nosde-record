// src/features/dashboard/components/Sidebar.tsx
import styles from "./Sidebar.module.css";

interface SidebarProps {
  onRequiredAuth: () => void;
}

export default function Sidebar({ onRequiredAuth }: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.navBlock}>
        <div className={styles.navItemActive}><span>🏠</span> Início</div>
        <div className={styles.navItem}><span>🔍</span> Procurar</div>
      </div>

      <div className={styles.libraryBlock}>
        <div className={styles.libraryHeader}>
          <div className={styles.libraryTitle}><span>📚</span> A tua Biblioteca</div>
          <button className={styles.plusBtn} onClick={onRequiredAuth}>+</button>
        </div>

        {/* Clicar aqui exige login */}
        <div className={styles.cardInfo}>
          <p className={styles.cardTitle}>Cria a tua primeira playlist</p>
          <p className={styles.cardSubtitle}>É fácil, nós ajudamos</p>
          <button className={styles.actionBtn} onClick={onRequiredAuth}>Criar playlist</button>
        </div>

        <div className={styles.cardInfo}>
          <p className={styles.cardTitle}>Vamos lá encontrar alguns podcasts</p>
          <p className={styles.cardSubtitle}>Vamos atualizar-te sobre os novos episódios</p>
          <button className={styles.actionBtn} onClick={onRequiredAuth}>Procurar podcasts</button>
        </div>
      </div>
    </div>
  );
}