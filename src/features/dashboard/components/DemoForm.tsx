// src/features/dashboard/components/DemoForm.tsx
import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import styles from "./DemoForm.module.css";
import { demoService } from "../../../services/demo.service";
import { toast } from "react-toastify";

export default function DemoForm() {
  // Estados para controlar o formulário (Boas práticas React)
  const [nomeArtistico, setNomeArtistico] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);


  // Referência para o input de ficheiro oculto
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCustomUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {

    console.log("Sending demo");
    e.preventDefault();
    
    if (!selectedFile) {
      setFeedbackMsg({ type: "error", text: "Por favor, selecione um ficheiro de áudio." });
      return;
    }

    setIsLoading(true);
    setFeedbackMsg(null);

    try {
    const response =  await demoService.enviarDemo({
        nomeArtistico,
        email,
        mensagem,
        audioFile: selectedFile,
      });


    toast.success(
          response.message
    );
      
      // Limpar o formulário após o sucesso
      setNomeArtistico("");
      setEmail("");
      setMensagem("");
      setSelectedFile(null);

      
    } catch (error) {
      console.error("Erro ao enviar a demo:", error);
    
       toast.error(
          "Falha ao enviar a demo. Tente novamente mais tarde."
    );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.demoSection}>
      <div className={styles.container}>
        
        {/* Lado Esquerdo: O Formulário */}
        <div className={styles.formWrapper}>
          <h2 className={styles.titleDemo}>Enviar a sua demo</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            
            <div className={styles.inputGroup}>
              <input 
                type="text"
                placeholder="Nome artístico" 
                value={nomeArtistico}
                onChange={(e) => setNomeArtistico(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            {/* Input de File Customizado e Elegante */}
            <div className={styles.inputGroup}>
              <input 
                type="file" 
                accept="audio/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className={styles.hiddenFileInput}
              />
              <button 
                type="button" 
                onClick={handleCustomUploadClick} 
                className={styles.uploadButton}
              >
                <FontAwesomeIcon icon={faCloudUploadAlt} className={styles.uploadIcon} />
                {selectedFile ? selectedFile.name : "Carregar música (.mp3, .wav)"}
              </button>
            </div>

            <div className={styles.inputGroup}>
              <textarea 
                placeholder="Mensagem..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className={styles.textarea}
                rows={4}
              ></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
              { isLoading  ? 'Enviando...': 'Enviar Demo' }
            </button>
          </form>
        </div>

        {/* Lado Direito: Informações de Contacto da Nosde Record */}
        <div className={styles.contactWrapper}>
          <div className={styles.socialHeaderIcons}>
            <a href="#instagram" className={styles.headerSocialIcon}><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#facebook" className={styles.headerSocialIcon}><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#twitter" className={styles.headerSocialIcon}><FontAwesomeIcon icon={faTwitter} /></a>
          </div>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <FontAwesomeIcon icon={faPhone} className={styles.infoIcon} />
              <span>+244 941 132 910</span>
            </div>
            <div className={styles.infoItem}>
              <FontAwesomeIcon icon={faInstagram} className={styles.infoIcon} />
              <span>@nosde_record</span>
            </div>
            <div className={styles.infoItem}>
              <FontAwesomeIcon icon={faFacebookF} className={styles.infoIcon} />
              <span>Nosde Record</span>
            </div>
            <div className={styles.infoItem}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.infoIcon} />
              <span>gest.lawizz@gmail.com</span>
            </div>
          </div>

          <div className={styles.brandContainer}>
            <h3 className={styles.brandTitle}>Nosde Record</h3>
            <p className={styles.brandSubtitle}>Distribution of Music & Promotion de Artistas</p>
          </div>
        </div>

      </div>
    </section>
  );
}