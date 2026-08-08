// src/features/dashboard/components/Footer.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import styles from "./Footer.module.css";

interface FooterProps {
  onRequiredAuth: () => void;
}

export default function Footer({ onRequiredAuth }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Empresa",
      links: ["Sobre", "Empregos", "For the Record"],
    },
    {
      title: "Comunidades",
      links: ["Para artistas", "Programadores", "Publicidade", "Investidores", "Fornecedores"],
    },
    {
      title: "Ligações úteis",
      links: ["Apoio", "App móvel grátis", "Popularidade por país", "Importa as tuas músicas"],
    },
    {
      title: "Planos Nosde",
      links: ["Premium Individual", "Premium Duo", "Premium Família", "Premium Estudante", "Nosde Free"],
    },
  ];

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.topSection}>
        {/* Links de Navegação */}
        <div className={styles.linksGrid}>
          {sections.map((section, index) => (
            <div key={index} className={styles.column}>
              <h4 className={styles.columnTitle}>{section.title}</h4>
              <ul className={styles.linkList}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className={styles.linkItem} onClick={onRequiredAuth}>
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Ícones de Redes Sociais */}
        <div className={styles.socialContainer}>
          <a href="#instagram" className={styles.socialIcon} onClick={(e) => { e.preventDefault(); onRequiredAuth(); }}>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#twitter" className={styles.socialIcon} onClick={(e) => { e.preventDefault(); onRequiredAuth(); }}>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#facebook" className={styles.socialIcon} onClick={(e) => { e.preventDefault(); onRequiredAuth(); }}>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Direitos Autorais / Copyright */}
      <div className={styles.bottomSection}>
        <p className={styles.copyright}>© {currentYear} Nosde Record</p>
      </div>
    </footer>
  );
}