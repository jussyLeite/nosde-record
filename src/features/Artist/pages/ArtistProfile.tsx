import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import styles from "../styles/ArtistProfile.module.css";
import {
  getMyArtistProfile,
  updateMyArtistProfile,
  type Artist,
} from "../../../services/artrist.serivice";
import EditArtistDialog from "../component/EditArtistDialog";


export default function ArtistProfile() {
  const auth = useAuth();

  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);


  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [isEditDialogOpen, setIsEditDialogOpen] =
  useState(false);

  const [isSaving, setIsSaving] = useState(false);

  if (!auth) {
    return null;
  }

  const { user } = auth;

  // =====================================================
  // DADOS DO UTILIZADOR
  // =====================================================

  const userName = user?.name || "Artista";

  const email = user?.email || "Sem e-mail";

  const avatarLetter = userName.charAt(0).toUpperCase();

  // =====================================================
  // ALTERAR FOTO
  // =====================================================


  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getMyArtistProfile();
        setArtist(data);
        console.log("Dados:",data);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);



  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoSelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Validação simples
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione uma imagem válida.");
      return;
    }

    // Limite de 5 MB
    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem não pode ultrapassar 5 MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);

    // Futuramente:
    // aqui iremos enviar a imagem para o backend
    // através do serviço de perfil.
  };

  // =====================================================
  // EDITAR PERFIL
  // =====================================================

 const handleSaveProfile = async (
  data: any
) => {
  try {
    setIsSaving(true);

    const updatedArtist =
      await updateMyArtistProfile(data);

    setArtist(updatedArtist);

    setIsEditDialogOpen(false);

  } catch (error) {
    console.error(
      "Erro ao atualizar perfil:",
      error
    );

    // Aqui podemos posteriormente colocar
    // um toast de erro.

  } finally {
    setIsSaving(false);
  }
};

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className={styles.profilePage}>

      {/* =================================================
          CABEÇALHO
      ================================================= */}

      <header className={styles.pageHeader}>

        <div>
          <h1 className={styles.pageTitle}>
            Meu perfil
          </h1>

          <p className={styles.pageSubtitle}>
            Gere as informações do teu perfil de artista.
          </p>
        </div>

        <button
          type="button"
          className={styles.editButton}
           onClick={() => setIsEditDialogOpen(true)}
        >
          <i
            className="fa fa-pencil"
            aria-hidden="true"
          />

          Editar perfil
        </button>




      </header>


      {/* =================================================
          PERFIL PRINCIPAL
      ================================================= */}

      <section className={styles.profileHero}>

        <div className={styles.profileMain}>

          {/* FOTO */}

          <div className={styles.avatarContainer}>

            {profileImage ? (
              <img
                src={profileImage}
                alt={`Foto de ${userName}`}
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.avatar}>
                {avatarLetter}
              </div>
            )}

            <button
              type="button"
              className={styles.cameraButton}
              onClick={handleChangePhoto}
              title="Alterar foto"
            >
              <i
                className="fa fa-camera"
                aria-hidden="true"
              />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handlePhotoSelected}
              className={styles.hiddenInput}
            />

          </div>


          {/* INFORMAÇÕES */}

          <div className={styles.profileIdentity}>

            <span className={styles.artistLabel}>
              ARTISTA
            </span>

            <h2 className={styles.artistName}>
              {artist?.user.name}
            </h2>

            <p className={styles.artistEmail}>
              {artist?.user.email}
            </p>

            <span className={styles.roleBadge}>
              <i
                className="fa fa-check-circle"
                aria-hidden="true"
              />

              Artista verificado
            </span>

          </div>

        </div>

      </section>


      {/* =================================================
          ESTATÍSTICAS
      ================================================= */}

      <section className={styles.statsGrid}>

        <div className={styles.statCard}>

          <div className={styles.statIcon}>
            <i
              className="fa fa-music"
              aria-hidden="true"
            />
          </div>

          <div>
            <span className={styles.statLabel}>
              Músicas
            </span>

            <strong className={styles.statValue}>
              0
            </strong>
          </div>

        </div>


        <div className={styles.statCard}>

          <div className={styles.statIcon}>
            <i
              className="fa fa-play"
              aria-hidden="true"
            />
          </div>

          <div>
            <span className={styles.statLabel}>
              Streams
            </span>

            <strong className={styles.statValue}>
              0
            </strong>
          </div>

        </div>


        <div className={styles.statCard}>

          <div className={styles.statIcon}>
            <i
              className="fa fa-heart"
              aria-hidden="true"
            />
          </div>

          <div>
            <span className={styles.statLabel}>
              Likes
            </span>

            <strong className={styles.statValue}>
              0
            </strong>
          </div>

        </div>


        <div className={styles.statCard}>

          <div className={styles.statIcon}>
            <i
              className="fa fa-download"
              aria-hidden="true"
            />
          </div>

          <div>
            <span className={styles.statLabel}>
              Downloads
            </span>

            <strong className={styles.statValue}>
              0
            </strong>
          </div>

        </div>

      </section>


      {/* =================================================
          INFORMAÇÕES DO ARTISTA
      ================================================= */}

      <section className={styles.contentGrid}>

        {/* =================================================
            INFORMAÇÕES PESSOAIS
        ================================================= */}

        <div className={styles.card}>

          <div className={styles.cardHeader}>

            <div>
              <h2 className={styles.cardTitle}>
                Informações do artista
              </h2>

              <p className={styles.cardSubtitle}>
                Informações básicas sobre o teu perfil.
              </p>
            </div>

          </div>


          <div className={styles.infoGrid}>

            <div className={styles.infoItem}>

              <span className={styles.infoLabel}>
                Nome artístico
              </span>

              <span className={styles.infoValue}>
                {artist?.stageName}
              </span>

            </div>


            <div className={styles.infoItem}>

              <span className={styles.infoLabel}>
                E-mail
              </span>

              <span className={styles.infoValue}>
                {artist?.user.email}
              </span>

            </div>


            <div className={styles.infoItem}>

              <span className={styles.infoLabel}>
                Género musical
              </span>

              <span className={styles.infoValueMuted}>
                Não definido
              </span>

            </div>


            <div className={styles.infoItem}>

              <span className={styles.infoLabel}>
                Localização
              </span>

              <span className={styles.infoValueMuted}>
                Não definida
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            REDES SOCIAIS
        ================================================= */}

        <div className={styles.card}>

          <div className={styles.cardHeader}>

            <div>
              <h2 className={styles.cardTitle}>
                Redes sociais
              </h2>

              <p className={styles.cardSubtitle}>
                Liga as tuas redes sociais ao perfil.
              </p>
            </div>

          </div>


          <div className={styles.socialList}>

            <div className={styles.socialItem}>

              <span className={styles.socialIcon}>
                <i
                  className="fa fa-instagram"
                  aria-hidden="true"
                />
              </span>

              <div className={styles.socialInfo}>

                <span className={styles.socialName}>
                  Instagram
                </span>

                <span className={styles.socialValue}>
                {artist?.instagram || "Não conectado"}  
                </span>

              </div>

              <button
                type="button"
                className={styles.connectButton}
              >
                Conectar
              </button>

            </div>


            <div className={styles.socialItem}>

              <span className={styles.socialIcon}>
                <i
                  className="fa fa-facebook"
                  aria-hidden="true"
                />
              </span>

              <div className={styles.socialInfo}>

                <span className={styles.socialName}>
                  Facebook
                </span>

                <span className={styles.socialValue}>
                   {artist?.facebook || "Não conectado"} 
                </span>

              </div>

              <button
                type="button"
                className={styles.connectButton}
              >
                Conectar
              </button>

            </div>


            <div className={styles.socialItem}>

              <span className={styles.socialIcon}>
                <i
                  className="fa fa-youtube-play"
                  aria-hidden="true"
                />
              </span>

              <div className={styles.socialInfo}>

                <span className={styles.socialName}>
                  YouTube
                </span>

                <span className={styles.socialValue}>
                   {artist?.youtube || "Não conectado"}  
                </span>

              </div>

              <button
                type="button"
                className={styles.connectButton}
              >
                Conectar
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          BIOGRAFIA
      ================================================= */}

      <section className={styles.card}>

        <div className={styles.cardHeader}>

          <div>

            <h2 className={styles.cardTitle}>
              Biografia
            </h2>

            <p className={styles.cardSubtitle}>
              Apresenta-te aos teus fãs.
            </p>

          </div>

        </div>


        <div className={styles.bioEmpty}>

          <i
            className="fa fa-file-text-o"
            aria-hidden="true"
          />



          <p>
            { artist?.bio || "Ainda não adicionaste uma biografia."} 
          </p>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleSaveProfile}
          >
            Adicionar biografia
          </button>

        </div>

      </section>


      {/* =================================================
          ESTADO DO PERFIL
      ================================================= */}

      <section className={styles.profileCompletion}>

        <div className={styles.completionIcon}>

          <i
            className="fa fa-info-circle"
            aria-hidden="true"
          />

        </div>

        <div className={styles.completionContent}>

          <strong>
            Completa o teu perfil
          </strong>

          <p>
            Adiciona uma biografia, género musical,
            localização e redes sociais para apresentar
            melhor o teu trabalho aos fãs.
          </p>

        </div>

        <button
          type="button"
          className={styles.completeButton}
          onClick={handleSaveProfile}
        >
          Completar perfil
        </button>

      </section>

      <EditArtistDialog
        open={isEditDialogOpen}
        artist={artist}
        loading={isSaving}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveProfile}
        />
        

    </div>
  );
}