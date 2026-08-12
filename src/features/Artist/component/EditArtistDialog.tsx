import { useEffect, useState } from "react";

import type {
  Artist,
  UpdateArtistData,
} from "../../../services/artrist.serivice";
import "../styles/EditArtistDialog.css";

interface EditArtistDialogProps {
  open: boolean;
  artist: Artist | null;
  loading?: boolean;
  onClose: () => void;
  onSave: (data: UpdateArtistData) => Promise<void>;
}

export default function EditArtistDialog({
  open,
  artist,
  loading = false,
  onClose,
  onSave,
}: EditArtistDialogProps) {
  const [form, setForm] = useState<UpdateArtistData>({
    stageName: "",
    bio: "",
    imageUrl: "",
    facebook: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  });

  /**
   * Preencher formulário quando o artista mudar
   */
  useEffect(() => {
    if (!artist) return;

    setForm({
      stageName: artist.stageName ?? "",
      bio: artist.bio ?? "",
      imageUrl: artist.imageUrl ?? "",
      facebook: artist.facebook ?? "",
      instagram: artist.instagram ?? "",
      youtube: artist.youtube ?? "",
      tiktok: artist.tiktok ?? "",
    });
  }, [artist]);

  /**
   * Não renderizar quando fechado
   */
  if (!open) {
    return null;
  }

  /**
   * Alterar campos
   */
  const handleChange = (
    field: keyof UpdateArtistData,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /**
   * Submit
   */
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    await onSave({
      stageName: form.stageName?.trim(),
      bio: form.bio?.trim() || null,
      imageUrl: form.imageUrl?.trim() || null,
      facebook: form.facebook?.trim() || null,
      instagram: form.instagram?.trim() || null,
      youtube: form.youtube?.trim() || null,
      tiktok: form.tiktok?.trim() || null,
    });
  };

  return (
    <div
      className="artist-dialog-overlay"
      onMouseDown={onClose}
    >
      <div
        className="artist-dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="artist-dialog-header">

          <div>
            <h2>Editar perfil</h2>

            <p>
              Atualiza as informações do teu perfil de artista.
            </p>
          </div>

          <button
            type="button"
            className="artist-dialog-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>

        </div>


        {/* ========================================
            FORM
        ======================================== */}

        <form
          className="artist-dialog-form"
          onSubmit={handleSubmit}
        >

          {/* ======================================
              INFORMAÇÕES DO ARTISTA
          ====================================== */}

          <section className="artist-dialog-section">

            <div className="artist-dialog-section-title">
              <h3>Informações do artista</h3>

              <p>
                Estas informações aparecem no teu perfil público.
              </p>
            </div>


            {/* Nome artístico */}

            <div className="artist-form-group">

              <label htmlFor="stageName">
                Nome artístico
              </label>

              <input
                id="stageName"
                type="text"
                value={form.stageName ?? ""}
                onChange={(event) =>
                  handleChange(
                    "stageName",
                    event.target.value
                  )
                }
                placeholder="Ex: Durte Neto"
              />

            </div>


            {/* Biografia */}

            <div className="artist-form-group">

              <label htmlFor="bio">
                Biografia
              </label>

              <textarea
                id="bio"
                rows={5}
                value={form.bio ?? ""}
                onChange={(event) =>
                  handleChange(
                    "bio",
                    event.target.value
                  )
                }
                placeholder="Fala um pouco sobre ti, a tua música e o teu trabalho..."
              />

              <span className="artist-form-help">
                Apresenta-te ao público de forma breve.
              </span>

            </div>


            {/* Imagem */}

            <div className="artist-form-group">

              <label htmlFor="imageUrl">
                Imagem de perfil
              </label>

              <input
                id="imageUrl"
                type="url"
                value={form.imageUrl ?? ""}
                onChange={(event) =>
                  handleChange(
                    "imageUrl",
                    event.target.value
                  )
                }
                placeholder="https://..."
              />

              <span className="artist-form-help">
                Por enquanto podes utilizar o URL da imagem.
              </span>

            </div>

          </section>


          {/* ======================================
              REDES SOCIAIS
          ====================================== */}

          <section className="artist-dialog-section">

            <div className="artist-dialog-section-title">

              <h3>Redes sociais</h3>

              <p>
                Adiciona as tuas redes para que os fãs
                possam encontrar-te.
              </p>

            </div>


            <div className="artist-social-grid">

              {/* Instagram */}

              <div className="artist-form-group">

                <label htmlFor="instagram">
                  Instagram
                </label>

                <input
                  id="instagram"
                  type="url"
                  value={form.instagram ?? ""}
                  onChange={(event) =>
                    handleChange(
                      "instagram",
                      event.target.value
                    )
                  }
                  placeholder="https://instagram.com/..."
                />

              </div>


              {/* Facebook */}

              <div className="artist-form-group">

                <label htmlFor="facebook">
                  Facebook
                </label>

                <input
                  id="facebook"
                  type="url"
                  value={form.facebook ?? ""}
                  onChange={(event) =>
                    handleChange(
                      "facebook",
                      event.target.value
                    )
                  }
                  placeholder="https://facebook.com/..."
                />

              </div>


              {/* YouTube */}

              <div className="artist-form-group">

                <label htmlFor="youtube">
                  YouTube
                </label>

                <input
                  id="youtube"
                  type="url"
                  value={form.youtube ?? ""}
                  onChange={(event) =>
                    handleChange(
                      "youtube",
                      event.target.value
                    )
                  }
                  placeholder="https://youtube.com/..."
                />

              </div>


              {/* TikTok */}

              <div className="artist-form-group">

                <label htmlFor="tiktok">
                  TikTok
                </label>

                <input
                  id="tiktok"
                  type="url"
                  value={form.tiktok ?? ""}
                  onChange={(event) =>
                    handleChange(
                      "tiktok",
                      event.target.value
                    )
                  }
                  placeholder="https://tiktok.com/@..."
                />

              </div>

            </div>

          </section>


          {/* ======================================
              FOOTER
          ====================================== */}

          <div className="artist-dialog-footer">

            <button
              type="button"
              className="artist-btn artist-btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="artist-btn artist-btn-primary"
              disabled={loading}
            >
              {loading
                ? "A guardar..."
                : "Guardar alterações"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}