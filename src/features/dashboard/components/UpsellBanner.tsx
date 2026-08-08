// src/features/dashboard/components/UpsellBanner.tsx
import styles from "./UpsellBanner.module.css";

interface UpsellBannerProps {
  onRequiredAuth: () => void;
}

export default function UpsellBanner({ onRequiredAuth }: UpsellBannerProps) {
  return (
    <div className={styles.banner} onClick={onRequiredAuth}>
      <div className={styles.textContainer}>
        <span className={styles.topText}>Pré-visualização do Spotify</span>
        <span className={styles.subText}>
          Regista-te para ouvires músicas e podcasts ilimitados. Não é necessário cartão de crédito.
        </span>
      </div>
      <button className={styles.registerBtn} onClick={onRequiredAuth}>
        Regista-te já gratuitamente
      </button>
    </div>
  );
}