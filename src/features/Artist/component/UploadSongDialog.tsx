import { useState } from "react";
import "../styles/UploadSongDialog.css";
import type { CreateSongData } from "../../../types/CreateSongData";
import { toast } from "react-toastify";

interface UploadSongDialogProps {
  open: boolean;
  loading?: boolean;

  onClose: () => void;

  onUpload: (
    data: CreateSongData
  ) => Promise<void>;
}

export default function UploadSongDialog({
  open,
  loading = false,
  onClose,
  onUpload,
}: UploadSongDialogProps) {

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] =
    useState("");

  const [cover, setCover] =
    useState<File | null>(null);

  const [audio, setAudio] =
    useState<File | null>(null);

  const [error, setError] =
    useState<string | null>(null);

 const [sucess, setSucess] = useState<string | null>(null);


  if (!open) {
    return null;
  }


  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    setError(null);


    /* =========================================
       VALIDAÇÕES
    ========================================= */

    if (!title.trim()) {
      setError(
        "O título da música é obrigatório."
      );

       toast.success(
      "O título da música é obrigatório."
    );

      return;
    }

    if (!genre.trim()) {
      setError(
        "O género musical é obrigatório."
      );

        toast.error(
      "O género musical é obrigatório."
    );

      return;
    }

    if (!cover) {
      setError(
        "Seleciona uma imagem para a capa."
      );

       toast.error(
      "Seleciona uma imagem para a capa."
    );
      return;
    }

    if (!audio) {
      setError(
        "Seleciona o ficheiro de áudio."
      );

        toast.error(
      "Seleciona o ficheiro de áudio."
    );

      return;
    }


    try {

      await onUpload({
        title: title.trim(),
        genre: genre.trim(),
        description:
          description.trim(),

        cover,
        audio,
      });

      setSucess("Upload da musica feito com sucesso");
       toast.success(
      "Upload da musica feito com sucesso."
    );

    } catch (error) {

      console.error(error);



      setError(
        "Não foi possível fazer o upload da música."
      );

        toast.error(
      "Não foi possível fazer o upload da música."
    );
    }
  };


  const handleClose = () => {

    if (loading) {
      return;
    }

    setTitle("");
    setGenre("");
    setDescription("");

    setCover(null);
    setAudio(null);

    setError(null);
    setSucess(null);

    onClose();
  };


  return (
    <div
      className="upload-song-overlay"
      onMouseDown={handleClose}
    >

      <div
        className="upload-song-dialog"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="upload-song-header">

          <div>
            <h2>
              Upload de música
            </h2>

            <p>
              Adiciona uma nova música ao teu
              catálogo.
            </p>
          </div>


          <button
            type="button"
            className="upload-song-close"
            onClick={handleClose}
            disabled={loading}
          >
            ×
          </button>

        </div>


        {/* =====================================
            FORM
        ===================================== */}

        <form
          className="upload-song-form"
          onSubmit={handleSubmit}
        >

          {/* ===================================
              INFORMAÇÕES
          =================================== */}

          <section className="upload-song-section">

            <div className="upload-song-section-title">

              <h3>
                Informações da música
              </h3>

              <p>
                Preenche os dados principais
                da música.
              </p>

            </div>


            {/* Título */}

            <div className="upload-song-field">

              <label htmlFor="song-title">
                Título *
              </label>

              <input
                id="song-title"
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="Ex: Minha Música"
                disabled={loading}
              />

            </div>


            {/* Género */}

            <div className="upload-song-field">

              <label htmlFor="song-genre">
                Género *
              </label>

              <select
                id="song-genre"
                value={genre}
                onChange={(event) =>
                  setGenre(event.target.value)
                }
                disabled={loading}
              >

                <option value="">
                  Selecionar género
                </option>

                <option value="AFRO_HOUSE">
                  Afro House
                </option>

                <option value="AFRO_BEATS">
                  Afro Beats
                </option>

                <option value="KUDURO">
                  Kuduro
                </option>

                <option value="SEMBA">
                  Semba
                </option>

                <option value="RNB">
                  R&B
                </option>

                <option value="HIP_HOP">
                  Hip Hop
                </option>

                <option value="RAP">
                  Rap
                </option>

                <option value="GOSPEL">
                  Gospel
                </option>

                <option value="POP">
                  Pop
                </option>

                <option value="OUTRO">
                  Outro
                </option>

              </select>

            </div>


            {/* Descrição */}

            <div className="upload-song-field">

              <label htmlFor="song-description">
                Descrição
              </label>

              <textarea
                id="song-description"
                rows={4}
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
                placeholder="Escreve uma breve descrição..."
                disabled={loading}
              />

            </div>

          </section>


          {/* ===================================
              FICHEIROS
          =================================== */}

          <section className="upload-song-section">

            <div className="upload-song-section-title">

              <h3>
                Ficheiros
              </h3>

              <p>
                Adiciona a capa e o ficheiro
                de áudio.
              </p>

            </div>


            {/* =================================
                COVER
            ================================= */}

            <div className="upload-file-group">

              <label>
                Capa da música *
              </label>

              <label
                htmlFor="song-cover"
                className="upload-file-box"
              >

                <span className="upload-file-icon">
                  🖼
                </span>

                <span className="upload-file-content">

                  <strong>
                    {cover
                      ? cover.name
                      : "Selecionar capa"}
                  </strong>

                  <small>
                    JPG, JPEG, PNG ou WEBP
                  </small>

                </span>

                <span className="upload-file-button">
                  Escolher
                </span>

              </label>

              <input
                id="song-cover"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => {

                  const file =
                    event.target.files?.[0];

                  setCover(file ?? null);

                }}
                disabled={loading}
                hidden
              />

            </div>


            {/* =================================
                AUDIO
            ================================= */}

            <div className="upload-file-group">

              <label>
                Ficheiro de áudio *
              </label>

              <label
                htmlFor="song-audio"
                className="upload-file-box"
              >

                <span className="upload-file-icon">
                  ♪
                </span>

                <span className="upload-file-content">

                  <strong>
                    {audio
                      ? audio.name
                      : "Selecionar áudio"}
                  </strong>

                  <small>
                    MP3, WAV ou outro formato suportado
                  </small>

                </span>

                <span className="upload-file-button">
                  Escolher
                </span>

              </label>

              <input
                id="song-audio"
                type="file"
                accept="audio/*"
                onChange={(event) => {

                  const file =
                    event.target.files?.[0];

                  setAudio(file ?? null);

                }}
                disabled={loading}
                hidden
              />

            </div>

          </section>


          {/* ===================================
              ERROR
          =================================== */}

          {error && (
            <div className="upload-song-error">
              {error}
            </div>
          )}

           {error && (
            <div className="upload-song-success">
              {sucess}
            </div>
          )}


          {/* ===================================
              FOOTER
          =================================== */}

          <div className="upload-song-footer">

            <button
              type="button"
              className="upload-btn upload-btn-secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Cancelar
            </button>


            <button
              type="submit"
              className="upload-btn upload-btn-primary"
              disabled={loading}
            >

              {loading
                ? "A enviar..."
                : "Publicar música"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}